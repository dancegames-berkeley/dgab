<script lang="ts">
    import { onMount } from "svelte";
    import type { PackDetails } from "../../../lib/types";

    export let filteredPackDict: { [key: string]: PackDetails };
    export let handleClick;
    export let handleEnter;
    export let openPack;

    let groupedSongs = groupSongs();

    function groupSongs() {
        const groups: { [key: string]: string[] } = {};
        for (const pack of Object.values(filteredPackDict)) {
            for (const song of Object.values(pack.songs)) {
                let firstChar = song.title.trimStart().charAt(0).toUpperCase();
                if (!/^[A-Z]$/.test(firstChar)) {
                    firstChar = '*';
                }
                if (!groups[firstChar]) {
                    groups[firstChar] = [];
                }
                groups[firstChar].push(song.title);
            }
        }
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
                    {#each songs.sort((a, b) => a.localeCompare(b)) as song}
                        <li class="song scroll-item text-center p-2 font-normal">
                            <p>{song}</p>
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </li>
{/each}