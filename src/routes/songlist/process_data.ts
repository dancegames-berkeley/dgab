import type { PackDetails, SongDetails, ChartDetails } from "./types";
import { v5 as uuid5 } from "uuid";

const url = "https://www.ocf.berkeley.edu/~dgab";
const NAMESPACE_SONG = "772c3614-0fa4-40c7-b654-af81d7a1b197";
const NAMESPACE_PACK = "8d7a2f09-452f-4e64-ab80-2320998f4595";

function generate_song_banner_UUID(
    pack: string,
    song: string,
) {
    return uuid5(`${pack}/${song}`, NAMESPACE_SONG).toString();
}

function generate_pack_banner_UUID(pack: string) {
    return uuid5(pack, NAMESPACE_PACK).toString();
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
                steps_type: chartData["steps_type"],
              };
              charts.push(chartDetails);
            }

            const songDetails: SongDetails = {
              title: songData["title"],
              pack: packData["name"],
              artist: songData["artist"],
              charts: charts,
              banner: `${url}/banners-webp/${generate_song_banner_UUID(packData["name"], songData["title"])}.webp`,
            };

            packSongs[songDetails.title] = songDetails;
          }
        } catch (e) {
          console.error("Error processing songs: ", e);
        }

        // add song to packs list
        const packDetails: PackDetails = {
          name: packData["name"],
          songs: packSongs,
          banner: `${url}/banners-webp/${generate_pack_banner_UUID(packData["name"])}.webp`,
        };

        packDict[packDetails.name] = packDetails;
      }
    }
  } catch (e) {
    console.error("Error processing pack data: ", e);
  }
  return packDict;
}