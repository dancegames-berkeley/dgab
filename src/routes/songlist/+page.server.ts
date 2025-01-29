export const load = async ({ fetch }) => {
    try {
        const response = await fetch("https://dancegames.studentorg.berkeley.edu/songs.json");
        const data = await response.json();
        return {
            data
        };
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};