import Memcached from 'memcached';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from 'stream';

const client = new Memcached('https://dancegames.studentorg.berkeley.edu/');

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

export const load = async ({ fetch, setHeaders }) => {
    setHeaders({ 'cache-control': 'public, max-age=3600' }); // cache client-side for 1 hour
    client.get('songs', (error: Error, value: any) => {
        if (error) {
            console.error(error);
        } else {
            if (value === null) {
                throw new Error('No value found in cache');
            }
            const data = JSON.parse(value);
            console.log(data);
            return { data };
        }
    });
    client.end();
    try {
        // fetch from S3 if not in cache
        const response = await s3Client.send(new GetObjectCommand({ Bucket: BUCKET_NAME, Key: 'songs.json' }));
        const stream = response.Body;
        if (!stream) {
            throw new Error('No stream returned from S3');
        }
        const streamData = await processStream(stream);
        const data = JSON.parse(streamData);

        // cache server-side for 1 day
        client.set('songs', JSON.stringify(data), 86400, (error: Error, result: Boolean) => {
            if (error) {
                console.error(error);
            }
        });
        client.end();
        return { data };
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};