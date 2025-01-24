
export const load = async ({ fetch }) => {
    const jsonURL = "/src/lib/songlist/songs.json"
    const response = await fetch(jsonURL)
    const data = await response.json()
    return { data }
}