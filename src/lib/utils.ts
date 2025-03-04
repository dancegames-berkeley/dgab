import type { ChartDetails, SongDetails, PackDetails } from './types';

/**
     * Filter charts based on steps_type
    */
export function filterCharts(charts: ChartDetails[], stepstype: string): ChartDetails[] {
    let filteredCharts = [];
    for (const chart of charts) {
        // console.log(chart.steps_type, stepstype);
        if (stepstype == chart.steps_type) {
            filteredCharts.push(chart);
        }
    }
    return filteredCharts;
}

/**
 * Filters song titles based on query and steps_type
 * @param query
 */
export function filterSongs(packDict: { [key: string]: PackDetails }, query: string, filters: { [key: string]: string }) {
    console.log("packdict: ", packDict);
    console.log(filters);
    let filteredDict: { [key: string]: { name: string; banner: string; songs: { [key: string]: SongDetails } } } = {};
    for (const [packName, packDetails] of Object.entries(packDict)) {
        let filteredSongs: { [key: string]: SongDetails } = {};
        for (const [songName, songDetails] of Object.entries(
            packDetails.songs,
        ) as [string, SongDetails][]) {
            if (
                songDetails.title.toLowerCase().includes(query)
            ) {
                let filteredCharts = filterCharts(songDetails.charts, filters.stepstype)
                if (filteredCharts.length > 0) {
                    filteredSongs[songName] = {
                        ...songDetails,
                        charts: filteredCharts
                    };
                }
            }
        }
        if (Object.keys(filteredSongs).length > 0) {
            filteredDict[packName] = {
                name: packDetails.name,
                banner: packDetails.banner || "",
                songs: filteredSongs,
            };
        }
    }
    // console.log(filteredDict);
    return filteredDict;
}