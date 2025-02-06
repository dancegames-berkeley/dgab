import Memcached from 'memcached';
const client = new Memcached('https://dancegames.studentorg.berkeley.edu/');

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
        const response = await fetch('https://dancegames.studentorg.berkeley.edu/' + 'songs.json');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        // cache server-side for 1 day
        client.set('songs', JSON.stringify(data), 86400, (error: Error, result: Boolean) => {
            if (error) {
                console.error(error);
            } else {
                console.log(result);
            }
        });
        client.end();
        return { data };
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};