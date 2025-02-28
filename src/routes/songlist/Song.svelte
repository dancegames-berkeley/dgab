<script lang="ts">
    import { onMount } from "svelte";
    import type { ChartDetails, FocusedSong } from "./types";
    import { drawArrows } from "../../lib/drawarrowsbg";

    export let focusedSong: FocusedSong;
    export let currentIndex: number;
    export let prevIndex: number;
    export let filters: { [key: string]: boolean };

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

    function filter(charts: ChartDetails[], singles: boolean): ChartDetails[] {
        let filteredCharts = [];
        for (const chart of charts) {
            if (singles && chart.steps_type === "dance-single") {
                filteredCharts.push(chart);
            } else if (!singles && chart.steps_type === "dance-double") {
                filteredCharts.push(chart);
            }
        }
        return filteredCharts;
    }

    // handle mobile
    let mobileScreen = false;

    function handleExitFocus() {
        currentIndex = NaN;
    }

    onMount(() => {
        const canvas = document.getElementById("arrowsbg") as HTMLCanvasElement;
        const section = document.getElementById("current song") as HTMLElement;

        drawArrows(canvas, section);

        // redraw on window resize
        const handleResize = () => drawArrows(canvas, section);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });
</script>

<div
    id="current song"
    class="w-screen md:w-1/2 h-auto max-h-screen md:max-h-full flex items-center bg-darknavy relative"
>
    {#if !isNaN(currentIndex) && !mobileScreen}
        <canvas id="arrowsbg" class="absolute inset-0 w-full z-0 flex flex-col"
        ></canvas>
    {/if}
    {#if !isNaN(currentIndex)}
        <div
            id="info"
            class="flex flex-col items-center z-1 relative w-full items-center justify-center"
        >
            <div class="bg-navy w-full max-w-[750px] flex flex-col items-left">
                {#if focusedSong.banner}
                    <div class="relative inline-block">
                        <button
                            class="block md:hidden absolute top-2 right-2 text-2xl text-white cursor-pointer"
                            on:click={handleExitFocus}
                        >
                            <i class="bi bi-x"></i>
                        </button>
                        <img
                            loading="lazy"
                            src={focusedSong.banner}
                            class="aspect-[2.55] w-full max-w-[750px] bg-cover bg-center bg-placeholder flex justify-center items-center text-slate-600 text-xl md:text-3xl z-1"
                            alt={focusedSong.title}
                        />
                    </div>
                {:else}
                    <div
                        class="aspect-[2.55] w-full max-w-[750px] bg-cover bg-center bg-placeholder flex justify-center items-center text-slate-600 text-xl md:text-3xl z-1"
                    >
                        no banner found
                    </div>
                {/if}
                <div class="flex flex-col text-2xl pl-4 pt-4 pr-4 font-miso">
                    {#if focusedSong.title}
                        <p class="">
                            <span class="text-slate-500 p-2">TITLE</span>
                            {focusedSong.title}
                        </p>
                    {/if}
                    {#if focusedSong.artist}
                        <p class="">
                            <span class="text-slate-500 p-2 pt-0">ARTIST</span>
                            {focusedSong.artist}
                        </p>
                    {/if}
                    <div class="flex md:hidden pb-4">
                        {#if focusedSong.charts.length > 0}
                            <p class="">
                                <span class="text-slate-500 p-2 pt-0"
                                    >CHARTS</span
                                >
                                {#each focusedSong.charts.sort(sortByDifficulty) as chart}
                                    <span
                                        class="mx-2 text-3xl font-wendy text-{chart.difficulty.toLowerCase()}"
                                        >{chart.meter}</span
                                    >
                                {/each}
                            </p>
                        {/if}
                    </div>
                    <div class="hidden md:flex">
                        <div
                            class="mt-4 flex flex-col font-miso text-2xl overflow-y-auto w-full"
                        >
                            {#if focusedSong.charts.length > 0}
                                {#each filter(focusedSong.charts.sort(sortByDifficulty), filters["singles"]) as chart}
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
    {/if}
</div>
