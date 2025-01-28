import { promises as fs } from 'fs';
import path from 'path';
import { env } from '$env/dynamic/private';

const keys = ["BANNER_PATH", "BANNER", "SONGS",  "TITLE", "SUBTITLE", "ARTIST", "CREDIT", "TITLETRANSLIT", "SUBTITLETRANSLIT", "ARTISTTRANSLIT", "GENRE", "CREDIT","BACKGROUND", "PREVIEWVID", "JACKET", "BPMS", "CHARTS", "CHARTNAME", "STEPSTYPE", "DESCRIPTION", "CHARTSTYLE", "DIFFICULTY", "METER"]

function keysToLowerCase(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(keysToLowerCase);
    }

    return Object.keys(obj).reduce((acc, key) => {
        const lowerKey = keys.includes(key) ? key.toLowerCase() : key;
        acc[lowerKey] = keysToLowerCase(obj[key]);
        return acc;
    }, {} as any);
}

export async function load() {
    const jsonPath = env.JSON_FILE_PATH;
    let data;

    if (jsonPath) {
        try {
            const filePath = path.resolve(jsonPath);
            const fileData = await fs.readFile(filePath, 'utf8');
            data = keysToLowerCase(JSON.parse(fileData));
            console.log('Successfully read JSON file');
        } catch (error) {
            console.error('Failed to read JSON file', error);
            return { error: 'Failed to read JSON file' };
        }
    } else {
        console.error('JSON file path is not defined');
        return { error: 'JSON file path is not defined' };
    }
    console.log("data: ", data);
    return { packs: data };
}