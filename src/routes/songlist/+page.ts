import data from "$lib/songlist/songs.json"

export const load = async ({ fetch }) => {
    return { data }
}