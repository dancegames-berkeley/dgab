import type { PackDetails, SongDetails, ChartDetails } from "./types";

function sanitizeName(name: string) {
  name = name.replace(/ /g, '_');
  name = name.replace(/[^a-zA-Z0-9_\-]/g, '');
  return name;
}

export function processData(packs: any) {
  let packDict: { [key: string]: PackDetails } = {};
  try {
    for (const pack in packs) {
      if (packs.hasOwnProperty(pack)) {
        const packData = packs[pack];
        const packSongs: { [key: string]: SongDetails } = {};

        try {
          for (const song in packData.songs) {
            const songData: SongDetails = packData.songs[song];
            const charts: ChartDetails[] = [];

            // create a new dictionary to map meter -> difficulty
            for (const chart of songData.charts) {
              const chartData = chart;

              const chartDetails: ChartDetails = {
                meter: chartData["meter"],
                difficulty: chartData["difficulty"],
                credit: chartData["credit"],
              };
              charts.push(chartDetails);
            }

            const songDetails: SongDetails = {
              title: songData["title"].toString(),
              pack: packData["name"],
              artist: songData["artist"],
              charts: charts,
              banner: songData["banner"] ? `${sanitizeName(packData["name"])}__${sanitizeName(songData["title"])}.webp` : "",
            };

            packSongs[songDetails.title] = songDetails;
          }
        } catch (e) {
          console.error("Error processing songs: ", e);
        }

        // add song to packs list
        const packDetails: PackDetails = {
          name: packData["name"].toString(),
          songs: packSongs,
          banner: packData["banner"] ? `${sanitizeName(packData["name"])}.webp` : "",
        };

        packDict[packDetails.name] = packDetails;
      }
    }
  } catch (e) {
    console.error("Error processing pack data: ", e);
  }
  return packDict;
}