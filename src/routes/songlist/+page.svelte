<script lang="ts">
  // TODO: add search bar
  // TODO: add options to toggle singles/doubles mode, sort by artist, title etc.
  // TODO: maybe add hover/key navigation functionality for right container, for scrolling through difficulties. right now there's just minimal info that's always visible.
  // TODO: fix songlist CSS on mobile :(
  // TOOD: add a loading spinner for when the song data is being fetched
  // TODO: componentize
  import { onMount } from "svelte";
  import type { ChartDetails, SongDetails, PackDetails } from "./types";
  import { drawArrows } from "../../lib/drawarrowsbg";
  import { processData } from "./process_data";
  import Song from "./Song.svelte";

  // i don't mind if this is public rn, could reconsider later
  const s3Bucket = "https://dancegames.s3.us-west-1.amazonaws.com/";

  export let data;
  let packDict = processData(data.data);

  let openPack: string | null = null; // state variable to track what pack is opened

  // left container: pack/song scrolling
  let listContainer: HTMLElement;
  let scrollable: HTMLElement[] = [];
  let currentIndex = 0;

  // right container: current song/pack focus
  let focused_song_image: string;
  let focused_song_title: string;
  let focused_song_artist: string;
  let focused_song_charts: ChartDetails[];

  // on click show dropdown for all songs in pack
  function handleClick(packName: string) {
    openPack = openPack === packName ? null : packName;
    updateScrollable();
  }
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

      // keyboard navigation
      window.addEventListener("keydown", handleKeydown);
      window.addEventListener("keydown", handleEnter);
      window.addEventListener("mousemove", handleHover);

      // find all scrollable items on mount
      updateScrollable();

      // update scrollable items when pack is expanded
      const observer = new MutationObserver(() => {
        updateScrollable();
      });

      observer.observe(listContainer, { childList: true, subtree: true });

      // highlight the first element on mount
      if (scrollable.length > 0) {
        scrollable[currentIndex].classList.add("focused");
      }

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("keydown", handleKeydown);
        window.removeEventListener("keydown", handleEnter);
        window.removeEventListener("mousemove", handleHover);
      };
    } catch (e) {
      console.error("Error on mount: ", e);
    }
  });

  // updates CSS to show focus on the current element
  function updateFocus() {
    scrollable.forEach((div, index) => {
      if (index === currentIndex) {
        div.classList.add("focused");
      } else {
        div.classList.remove("focused");
      }
    });
    // handle current song sidebar
    // get songdetails of current song by iterating through packDict
    let focused_song = document.querySelector(".focused");
    let childText =
      focused_song && focused_song.firstElementChild
        ? focused_song.firstElementChild.textContent
        : "";
    let currentPack = openPack;
    for (const [_, packDetails] of Object.entries(packDict)) {
      if (packDetails.name === childText) {
        focused_song_image = packDetails.banner;
        focused_song_title = packDetails.name;
        focused_song_artist = "";
        focused_song_charts = [];
      }
      for (const [_, songDetails] of Object.entries(packDetails.songs)) {
        if (
          songDetails.title === childText &&
          songDetails.pack === currentPack
        ) {
          focused_song_artist = songDetails.artist;
          focused_song_image = songDetails.banner;
          focused_song_title = songDetails.title;
          focused_song_charts = songDetails.charts;
        }
      }
    }
  }

  // updates scrollable items
  const updateScrollable = () => {
    scrollable = Array.from(listContainer.querySelectorAll(".scroll-item"));
    currentIndex = scrollable.findIndex((div) =>
      div.classList.contains("focused"),
    );
  };

  // handle keyboard navigation through packs/songs
  const handleKeydown = (event: KeyboardEvent) => {
    if (scrollable.length > 0) {
      if (event.key === "ArrowDown") {
        currentIndex = (currentIndex + 1) % scrollable.length;
        updateFocus();
        scrollable[currentIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (event.key === "ArrowUp") {
        currentIndex =
          (currentIndex - 1 + scrollable.length) % scrollable.length;
        updateFocus();
        scrollable[currentIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  // handle enter key to select pack
  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      if (scrollable[currentIndex].classList.contains("pack")) {
        const pack = scrollable[currentIndex].textContent;
        if (pack) {
          handleClick(pack);
        }
      }
    }
  };

  const handleHover = (event: MouseEvent) => {
    if (scrollable.length > 0) {
      currentIndex = scrollable.findIndex((div) =>
        div.contains(event.target as Node),
      );
      updateFocus();
    }
  };
</script>

<section class="flex flex-row content-area">
  <div
    id="packs"
    class="w-1/2 h-full flex flex-col bg-navy z-1 overflow-y-auto"
    bind:this={listContainer}
  >
    <ul>
      <!-- <li class="font-semibold text-darknavy text-center bg-yellow-500">
        Note: the current songlist is a placeholder and it will be up to date
        soon.
      </li> -->
      {#each Object.entries(packDict).sort( ([, a], [, b]) => a.name.localeCompare(b.name), ) as [_, packDetails]}
        <li class="pack scroll-item font-semibold text-blue-300 text-center">
          <!-- TODO: not critical but might change, was kinda breaking when using enter to just trigger onclick but it would be nice to make it work -->
          <button
            type="button"
            class="p-2 w-full"
            on:click|preventDefault={() => handleClick(packDetails.name)}
            on:keydown={(event) => {
              if (event.key === "Enter") {
                event.stopPropagation();
                event.preventDefault();
                handleEnter(event);
              }
            }}
          >
            {packDetails.name}
          </button>
        </li>
        {#if openPack === packDetails.name}
          <div class="bg-darknavy">
            <ul>
              {#each Object.entries(packDetails.songs).sort( (a, b) => a[1].title.localeCompare(b[1].title), ) as [songName, songDetails]}
                <li class="song scroll-item text-center p-2">
                  <p>{songDetails.title}</p>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      {/each}
    </ul>
  </div>
  {#if currentIndex >= 0}
    <Song
      {focused_song_title}
      {focused_song_artist}
      {focused_song_image}
      {focused_song_charts}
    ></Song>
  {/if}
</section>

<style>
  .content-area {
    height: calc(100vh - var(--header-height));
  }
</style>
