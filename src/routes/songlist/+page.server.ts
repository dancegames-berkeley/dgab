export const load = async ({ fetch }) => {
    try {
        const response = await fetch("http://localhost:3000/songs.json");
        const data = await response.json();
        return {
            data
        };
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};