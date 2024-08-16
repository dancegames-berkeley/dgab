<script lang="ts">
  interface SongDetails {
    title: string;
    pack: string,
    artist: string;
    difficulties: string[];
  }

  export let data
  let packs: { [key: string]: SongDetails[] } = {};
  let songs = data.data

  for (const songName in songs) {
    if (songs.hasOwnProperty(songName)) {
      const song = songs[songName];
      const packName = song.pack;

      // If the packName doesn't exist in the packs object, create it
      if (!(packName in packs)) {
        packs[packName] = [];
      }

      // Add the song information to the pack
      let songDetails : SongDetails = {
        title: songName,
        pack: packName,
        difficulties: song.difficulties.join(", "),
        artist: song.artist
      }
      packs[packName].push(songDetails);
    }
  }
  function handleClick() {
    
  }
</script>

<section class="content">
  {#each Object.entries(packs) as [packName, songList]}
    <a on:click={handleClick()}>{packName}</a>
    {#each Object.entries(songList) as [_, songDetails]}
        <li>
          <p><strong>Title:</strong> {songDetails.title}</p>
          <p><strong>Artist:</strong> {songDetails.artist}</p>
          <p><strong>Difficulties:</strong> {songDetails.difficulties}</p>
        </li>
    {/each}
  {/each}
</section>