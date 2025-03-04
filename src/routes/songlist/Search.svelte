<script lang="ts">
import { onMount } from "svelte";

    export let query: string;
    export let filters: { [key: string]: string };
    let isMenuOpen = false;
    let isSortMenuOpen = false;
    let isStepsMenuOpen = false;

    onMount(() => {
        const searchInput = document.querySelector('.search')
        if (!searchInput) {
            return;
        }
        searchInput.addEventListener("input", (e) => {
            let inputQuery = (e.target as HTMLInputElement).value
            if (inputQuery && inputQuery.length > 0){
                query = inputQuery.toLowerCase()
            } else {
                query = "";
            }
            console.log(query)
        });
    });

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function toggleSortMenu() {
        isSortMenuOpen = !isSortMenuOpen;
    }

    function toggleStepsMenu() {
        isStepsMenuOpen = !isStepsMenuOpen;
    }

    function selectFilter(key: string, value: string) {
        filters = { ...filters, [key]: value };
        console.log(filters)
        if (key == "sortby") {
            isSortMenuOpen = false;
        } else if (key == "stepstype") {
            isStepsMenuOpen = false;
        }
    }

</script>
<div id="search" class="sticky top-0 flex text-slate-500 bg-darknavy">
    <i class="bi bi-filter-right absolute right-2 cursor-pointer" on:click={toggleMenu}></i>
    {#if isMenuOpen}
    <div class="absolute top-10 right-0 bg-darknavy text-slate-500">
        <div class="flex flex-col align-left text-left w-32">
            <button class="select w-full flex justify-between items-center" on:click={toggleSortMenu}>{filters.sortby}
                <i class="text-md bi bi-chevron-down"></i>
            </button>
            {#if isSortMenuOpen}
                <div class="flex flex-col text-left">
                    {#if filters.sortby === "artist"}
                        <button class="option" value="title" on:click={() => selectFilter("sortby", "title")}>title</button>
                    {/if}
                    {#if filters.sortby === "title"}
                        <button class="option" value="artist" on:click={() => selectFilter("sortby", "artist")}>artist</button>
                    {/if}
                </div>
            {/if}
            
            <button class="select w-full flex justify-between items-center" on:click={toggleStepsMenu}>{filters.stepstype === "dance-single" ? "singles" : "doubles"}
                <i class="text-md bi bi-chevron-down"></i>
            </button>
            {#if isStepsMenuOpen}
                <div class="flex flex-col text-left">
                    {#if filters.stepstype === "dance-double"}
                        <button class="option" value="dance-single" on:click={() => selectFilter("stepstype", "dance-single")}>singles</button>
                    {/if}
                    {#if filters.stepstype === "dance-single"}
                        <button class="option" value="dance-double" on:click={() => selectFilter("stepstype", "dance-double")}>doubles</button>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
    {/if}
    <input type="text" bind:value={query} class="search bg-darknavy px-2 flex-grow" placeholder="search by {filters.sortby}"/>
</div>