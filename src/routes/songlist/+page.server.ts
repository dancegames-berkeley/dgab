const s3Bucket = import.meta.env.VITE_S3_BUCKET;
export const load = async ({ fetch }) => {
    try {
        const response = await fetch(s3Bucket + 'songs.json');
        const data = await response.json();
        return {
            data
        };
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};