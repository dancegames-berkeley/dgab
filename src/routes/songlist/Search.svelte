<script lang="ts">
    import { onMount } from "svelte";

    export let query: string;

    onMount(() => {
        const searchInput = document.querySelector('.search')
        if (!searchInput) {
            return;
        }
        searchInput.addEventListener("input", (e) => {
            let inputQuery = (e.target as HTMLInputElement).value
            if (inputQuery && inputQuery.trim().length > 0){
                query = inputQuery.trimEnd().toLowerCase()
            } else {
                query = "";
            }
            console.log(query)
        });
    });
</script>
<div class="relative flex text-slate-500 bg-darknavy">
    <i class="bi bi-filter-right absolute right-2 cursor-pointer"></i>
    <input type="text" class="search bg-darknavy px-2 flex-grow" placeholder="search..."/>
</div>