<script lang="ts">
    import { onMount } from "svelte";
    import type { ChartDetails, FocusedSong } from "./types";
    import { drawArrows } from "../../lib/drawarrowsbg";

    export let focusedSong: FocusedSong;
    export let currentIndex: number;

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

    // handle mobile expanded song
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        checkMenu();
    }

    function checkMenu() {
        // const currentSong = document.getElementById("current song");
        // if (currentSong === null) {
        //     return;
        // }
        // if (!isMenuOpen || focusedSong.charts.length === 0) {
        //     currentSong.classList.add("max-h-[300px]");
        //     currentSong.classList.remove("max-h-screen");
        // } else if (isMenuOpen && focusedSong.charts.length > 0) {
        //     currentSong.classList.remove("max-h-[300px]");
        //     currentSong.classList.add("max-h-screen");
        // }
    }

    function checkScreenSize() {
        const mediaQuery = window.matchMedia("(min-width: 768px)"); // 768px = md
        isMenuOpen = mediaQuery.matches;
    }

    onMount(() => {
        checkMenu();
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        const canvas = document.getElementById("arrowsbg") as HTMLCanvasElement;
        const section = document.getElementById("current song") as HTMLElement;

        drawArrows(canvas, section);

        // redraw on window resize
        const handleResize = () => drawArrows(canvas, section);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("resize", checkScreenSize);
        };
    });
</script>

<div
    id="current song"
    class="w-screen md:w-1/2 h-auto max-h-screen md:max-h-full flex items-center bg-darknavy relative"
>
    <canvas id="arrowsbg" class="absolute inset-0 w-full z-0 flex flex-col"
    ></canvas>
    {#if !isNaN(currentIndex)}
        <div
            id="info"
            class="flex flex-col items-center z-1 relative w-full items-center justify-center"
        >
            <div class="bg-navy w-full max-w-[750px] flex flex-col items-left">
                {#if focusedSong.banner}
                    <img
                        loading="lazy"
                        src={focusedSong.banner}
                        class="aspect-[2.55] w-full max-w-[750px] bg-cover bg-center bg-placeholder flex justify-center items-center text-slate-600 text-xl md:text-3xl z-1"
                        alt={focusedSong.title}
                    />
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
                    <div
                        class="mt-4 flex flex-col font-miso text-2xl overflow-y-auto"
                    >
                        {#if isMenuOpen}
                            {#if focusedSong.charts}
                                {#each focusedSong.charts.sort(sortByDifficulty) as chart}
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
                        {/if}
                        <div class="flex md:hidden">
                            <button
                                class="w-full text-slate-500"
                                on:click={toggleMenu}
                            >
                                {#if !isMenuOpen}<i
                                        class="bi bi-chevron-down text-2xl"
                                    ></i>
                                {:else}<i class="bi bi-chevron-up text-2xl"
                                    ></i>{/if}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
