export interface ChartDetails {
    meter: number;
    difficulty: string;
    credit: string;
    steps_type: string;
}

export interface SongDetails {
    title: string;
    pack: string;
    artist: string;
    charts: ChartDetails[];
    banner: string;
}

export interface PackDetails {
    name: string;
    songs: { [key: string]: SongDetails }; // key = pack__title
    banner?: string;
}

export interface FocusedSong {
    title: string;
    artist: string;
    banner: string;
    charts: ChartDetails[];
}