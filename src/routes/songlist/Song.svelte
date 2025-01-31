<script lang="ts">
    import type { ChartDetails, SongDetails, PackDetails } from "./types";
    export let focused_song_image;
    export let focused_song_title;
    export let focused_song_artist;
    export let focused_song_charts;

    const sortByDifficulty = (a: ChartDetails, b: ChartDetails) => {
        const difficultyOrder = [
            "beginner",
            "easy",
            "medium",
            "hard",
            "challenge",
            "edit",
        ];
        return (
            difficultyOrder.indexOf(a.difficulty.toLowerCase()) -
            difficultyOrder.indexOf(b.difficulty.toLowerCase())
        );
    };
</script>

<div
    id="current song"
    class="w-1/2 h-full flex items-center bg-darknavy relative"
>
    <canvas id="arrowsbg" class="absolute inset-0 w-full z-0"></canvas>
    <div
        class="flex flex-col items-center z-1 relative w-full h-full items-center justify-center"
    >
        <div
            class="bg-navy w-full max-w-[750px] max-h-[750px] flex flex-col items-left"
        >
            {#if focused_song_image}
                <img
                    loading="lazy"
                    src={focused_song_image}
                    class="aspect-[2.55] w-full max-w-[750px] p-4 bg-cover bg-center bg-placeholder flex justify-center items-center text-slate-600 text-xl md:text-3xl z-1"
                    alt={focused_song_title}
                />
            {:else}
                <div
                    class="aspect-[2.55] w-full max-w-[750px] p-4 bg-cover bg-center bg-placeholder flex justify-center items-center text-slate-600 text-xl md:text-3xl z-1"
                >
                    no banner found
                </div>
            {/if}
            <div class="flex flex-col text-2xl pl-4 pt-4 pr-4 font-miso">
                {#if focused_song_title}
                    <p class="">
                        <span class="text-slate-500 p-2">TITLE</span>
                        {focused_song_title}
                    </p>
                {/if}
                {#if focused_song_artist}
                    <p class="">
                        <span class="text-slate-500 p-2 pt-0">ARTIST</span>
                        {focused_song_artist}
                    </p>
                {/if}
                <div
                    class="mt-4 flex flex-col font-miso text-2xl max-h-[300px] overflow-y-auto"
                >
                    {#if focused_song_charts}
                        {#each focused_song_charts.sort(sortByDifficulty) as chart}
                            <div class="flex flex-row h-16 flex-grow-0">
                                <p
                                    class="w-12 flex justify-center text-5xl font-wendy text-{chart.difficulty.toLowerCase()}"
                                >
                                    {chart.meter}
                                </p>
                                <p
                                    class="p-2 w-1/3 pl-4 flex items-center justify-start"
                                >
                                    {chart.difficulty}
                                </p>
                                {#if chart.credit}
                                    <p
                                        class="p-2 hidden md:flex flex-grow items-center justify-end text-slate-500"
                                    >
                                        {chart.credit}
                                    </p>
                                {/if}
                            </div>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
