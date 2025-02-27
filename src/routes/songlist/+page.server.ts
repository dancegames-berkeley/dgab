const url = "https://www.ocf.berkeley.edu/~dgab";

export const load = async ({ fetch, setHeaders }: { fetch: Function, setHeaders: (headers: Record<string, string>) => void }) => {
    setHeaders({'cache-control': 'public, max-age=3600' }); // cache client-side for 1 hour
    const response = await fetch(`${url}/songs.json`);
    const data = await response.json();
    return { data };
};