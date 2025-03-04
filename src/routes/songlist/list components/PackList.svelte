<script lang="ts">
    export let filteredPackDict;
    export let handleClick;
    export let handleEnter;
    export let openPack;
</script>
{#each Object.entries(filteredPackDict).sort( ([, a], [, b]) => a.name.localeCompare(b.name), ) as [_, packDetails]}
    <li
        class="pack scroll-item font-semibold text-blue-300 text-center"
    >
        <!-- TODO: not critical but might change, was kinda breaking when using enter to just trigger onclick but it would be nice to make it work -->
        <button
            type="button"
            class="p-2 w-full"
            on:click|preventDefault={() =>
                handleClick(packDetails.name)}
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