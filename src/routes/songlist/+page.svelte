<script lang="ts">
  // TODO: add search bar
  // TODO: add options to toggle singles/doubles mode, sort by artist, title etc.
  // TODO: maybe add hover/key navigation functionality for right container, for scrolling through difficulties. right now there's just minimal info that's always visible.
  // TODO: fix songlist CSS on mobile :(
  // TOOD: add a loading spinner for when the song data is being fetched
  // TODO: componentize
  import { onMount } from "svelte";
  import type { ChartDetails, SongDetails, PackDetails, FocusedSong } from "./types";
  import { drawArrows } from "../../lib/drawarrowsbg";
  import { processData } from "./process_data";
  import List from "./List.svelte";
  import Song from "./Song.svelte";

  export let data;
  let packDict = processData(data.data);
  let currentIndex = 0;

  let focusedSong: FocusedSong = {
    title: "",
    artist: "",
    banner: "",
    charts: [],
  };

  // draw arrows background
  // TODO: window resizing works almost all the time but will occasionaly draw arrows on the wrong dimensions and either leave space or overflow (vertically it looks like). i can't seem to reproduce this error. would be nice to fix
  onMount(() => {
    try {
      const canvas = document.getElementById("arrowsbg") as HTMLCanvasElement;
      const section = document.getElementById("current song") as HTMLElement;

      drawArrows(canvas, section);

      // redraw on window resize
      const handleResize = () => drawArrows(canvas, section);
      window.addEventListener("resize", handleResize);

       return () => {
        window.removeEventListener("resize", handleResize);
       };
    } catch (e) {
      console.error("Error on mount: ", e);
    }
  });
</script>

<section class="flex flex-row content-area">
  <List bind:currentIndex bind:focusedSong {packDict}
  />
  {#if currentIndex >= 0}
    <Song
      {focusedSong}
    />
  {/if}
</section>

<style>
  .content-area {
    height: calc(100vh - var(--header-height));
  }
</style>
