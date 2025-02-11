export interface ChartDetails {
    meter: number;
    difficulty: string;
    credit: string;
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
    songs: SongDetails[];
    banner?: string;
}

export interface FocusedSong {
    title: string;
    artist: string;
    banner: string;
    charts: ChartDetails[];
}