<script lang="ts">
    import type { PackDetails } from "../../../lib/types";
    import Kuroshiro from "kuroshiro";

    export let filteredPackDict: { [key: string]: PackDetails };
    export let handleClick;
    export let handleEnter;
    export let openPack;

    const kuroshiro = new Kuroshiro();

    let groupedSongs = groupSongs();

     function groupSongs() {
        console.log("grouping songs");
        const groups: { [key: string]: { title: string, artist: string }[] } = {};
        for (const pack of Object.values(filteredPackDict)) {
            for (const song of Object.values(pack.songs)) {
                let firstChar = "#";
                if (song.artist) {
                    firstChar = song.artist.trimStart().charAt(0).toUpperCase();
                    if (!/^[A-Z]$/.test(firstChar)) {
                        firstChar = '#';
                    }
                }
                if (!groups[firstChar]) {
                    groups[firstChar] = [];
                }
                groups[firstChar].push({ title: song.title, artist: song.artist });
            }
        }
        console.log(groups);
        return groups;
    }
</script>
{#each Object.entries(groupedSongs).sort(([a], [b]) => a.localeCompare(b)) as [letter, songs]}
    <li class="letter scroll-item font-semibold text-blue-300 text-center">
        <button
            type="button"
            class="p-2 w-full"
            on:click|preventDefault={() => handleClick(letter)}
            on:keydown={(event) => {
                if (event.key === "Enter") {
                    event.stopPropagation();
                    event.preventDefault();
                    handleEnter(event);
                }
            }}
        >
            {letter}
        </button>
        {#if openPack === letter}
            <div class="bg-darknavy">
                <ul>
                    {#each songs.sort((a, b) => a.artist.localeCompare(b.artist)) as song}
                        <li class="song scroll-item text-center p-2">
                            <p>{song.title} - {song.artist}</p>
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </li>
{/each}