import Memcached from 'memcached';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from 'stream';
import zlib from 'zlib';
import { Client } from 'memjs';

const memcached = Client.create("localhost:11211");

const REGION = import.meta.env.VITE_AWS_REGION;
const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;

const s3Client = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    }
});

const processStream = async (stream: Readable): Promise<string> => {
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf-8');
};


const fetchFromS3 = async () => {
    try {
        const response = await s3Client.send(new GetObjectCommand({ Bucket: BUCKET_NAME, Key: 'songs.json' }));
        const stream = response.Body;
        if (!stream) {
            throw new Error('No stream returned from S3');
        }
        const streamData = await processStream(stream);
        const data = JSON.parse(streamData);
        const compressedData = zlib.gzipSync(Buffer.from(JSON.stringify(data), 'utf-8'));

        // cache server-side for 1 day
        await memcached.set('songs', compressedData, { expires: 86400 });
        return data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};


const verifyCache = async (key: string) => {
    return new Promise((resolve, reject) => {
        memcached.get(key, async (err, val) => {
            if (err) return reject(err);
            if (val !== null) {
                const decompressedData = zlib.gunzipSync(val).toString('utf-8');
                const data = JSON.parse(decompressedData);
                resolve(data);
            } else {
                const data = await fetchFromS3();
                resolve(data);
            }
        });
    });
};

// Used for testing
const flushCache = async () => {
    memcached.flush((err, success) => {
        if (err) {
        console.error('Error flushing cache:', err);
        } else {
        console.log('Cache flushed successfully:', success);
        }
    });
};

export const load = async ({ fetch, setHeaders }: { fetch: Function, setHeaders: (headers: Record<string, string>) => void }) => {
    setHeaders({ 'cache-control': 'public, max-age=3600' }); // cache client-side for 1 hour
    const data = await verifyCache("songs");
    return { data };
};