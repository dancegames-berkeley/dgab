const s3Bucket = import.meta.env.VITE_S3_BUCKET;
export const load = async ({ fetch }) => {
    try {
        console.log(s3Bucket + 'songs.json');
        const response = await fetch('https://dancegames.studentorg.berkeley.edu/' + 'songs.json');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        return {
            data
        };
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};