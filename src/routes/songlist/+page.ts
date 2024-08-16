export const load = async ({ fetch }) => {
    const jsonURL = "songs-10-31-2023.json"
    const response = await fetch(jsonURL)
    const data = await response.json()
    return { data }
}