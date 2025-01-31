
export const load = async ({ fetch }) => {
    try {
        const s3Bucket = "https://dancegames.s3.us-west-1.amazonaws.com/";
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