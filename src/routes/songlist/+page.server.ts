
export const load = async ({ fetch, setHeaders }) => {
    setHeaders({ 'cache-control': 'public, max-age=86400' }); // cache for 1 day
    try {
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