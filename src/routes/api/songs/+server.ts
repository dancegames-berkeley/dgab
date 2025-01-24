import { json } from '@sveltejs/kit';
import { readdir, unlink, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { RequestHandler } from '@sveltejs/kit';

export async function POST({ request, params }) {
  const IMAGES_DIR = 'src/lib/songlist/images'
  try {
    const data = await request.formData();

    // process songs JSON
    let songs = data.get('data');
    if (typeof songs === 'string') {
      songs = JSON.parse(songs);
    } else {
      throw new Error('Invalid data: songs is not a string');
         }

    if (songs) {
      
      Object.entries(songs).forEach(([_, pack]) => {
          if (pack["BANNER_PATH"] && pack["BANNER"]) {
            pack["BANNER_PATH"] = `${IMAGES_DIR}/${pack["BANNER"]}`
          }
          pack["SONGS"].forEach((song: any) => {
            if (song["BANNER_PATH"] && song["BANNER"]) {
              song["BANNER_PATH"] = `${IMAGES_DIR}/${song["BANNER"]}`
            }
          })
        })
      }

    await writeFile('src/lib/songlist/songs.json', JSON.stringify(songs, null, 2), 'utf8');

    // process images and save to songlist/images
    // clear images folder whenever updated (this is mostly for dev tbh)
    const files = await readdir(IMAGES_DIR);
      for (const file of files) {
        await unlink(join(IMAGES_DIR, file));
      }

    // save each image
    for (const [name, value] of data.entries()) {
      if (name !== 'data' && value instanceof File) {
        const arrayBuffer = await (value as Blob).arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await writeFile(`${IMAGES_DIR}/${name}`, buffer);
      }
    }

    return json({ message: 'Data received and saved successfully', songs });
  } catch (error) {
    console.error('Error saving data:', error);
    return json({ error: 'Failed to process request' }, { status: 500 });
  }
}

