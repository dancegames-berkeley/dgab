<script lang="ts">
    import { onMount } from "svelte";
    import type { PackDetails, SongDetails, FocusedSong } from "./types";

    export let currentIndex: number;
    export let focusedSong: FocusedSong;
    export let packDict: { [key: string]: PackDetails } = {};

    let listContainer: HTMLElement;
    let scrollable: HTMLElement[] = [];
    let openPack: string | null = null; // state variable to track what pack is opened

    onMount(() => {
        try {
            // keyboard navigation
            window.addEventListener("keydown", handleKeydown);
            window.addEventListener("keydown", handleEnter);
            listContainer.addEventListener("mousemove", handleHover);

            // find all scrollable items on mount
            updateScrollable();

            // update scrollable items when pack is expanded
            const observer = new MutationObserver(() => {
                updateScrollable();
            });

            observer.observe(listContainer, { childList: true, subtree: true });

            // highlight the first element on mount
            if (scrollable.length > 0) {
                currentIndex = 0;
                scrollable[currentIndex].classList.add("focused");
            }

            return () => {
                window.removeEventListener("keydown", handleKeydown);
                window.removeEventListener("keydown", handleEnter);
                window.removeEventListener("mousemove", handleHover);
            };
        } catch (e) {
            console.error("Error on mount: ", e);
        }
    });

    // updates CSS to show focus on the current element
    async function updateFocus(
        focusedData: PackDetails | SongDetails,
        type: string,
    ) {
        if (type == "pack") {
            focusedSong.title = focusedData?.name;
            console.log(focusedData.banner);
            focusedSong.banner = focusedData?.banner || "";
            focusedSong.artist = "";
            focusedSong.charts = [];
        } else if (type == "song") {
            focusedSong.title = focusedData?.title || "";
            console.log(focusedData.banner);
            focusedSong.banner = focusedData?.banner || "";
            focusedSong.artist = focusedData?.artist || "";
            focusedSong.charts = focusedData?.charts || [];
        }
    }

    // on click show dropdown for all songs in pack
    function handleClick(packName: string) {
        openPack = openPack === packName ? null : packName;
    }

    // updates scrollable items
    const updateScrollable = () => {
        scrollable = Array.from(listContainer.querySelectorAll(".scroll-item"));
        currentIndex = scrollable.findIndex((div) =>
            div.classList.contains("focused"),
        );
    };

    // handle keyboard navigation through packs/songs
    // code is brain
    const handleKeydown = (event: KeyboardEvent) => {
        if (scrollable.length === 0) {
            return;
        }
        if (event.key === "ArrowDown") {
            currentIndex = (currentIndex + 1) % scrollable.length;
        } else if (event.key === "ArrowUp") {
            currentIndex =
                (currentIndex - 1 + scrollable.length) % scrollable.length;
        }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            handleNavigation();
            
            if (currentIndex < 10) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }

            let block: ScrollLogicalPosition = "center";
            if (currentIndex < 10 || currentIndex > scrollable.length - 10) {
                block = "nearest";
            }
            scrollable[currentIndex].scrollIntoView({
                behavior: "smooth",
                block: block,
                inline: "start",
            });
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

    async function handleNavigation() {
        if (scrollable.length === 0) {
            return;
        }
        // get div that is currently hovered on and add 'focused' styling
        scrollable.forEach((div, index) => {
            if (currentIndex < 0) {
                return;
            } else if (index === currentIndex) {
                div.classList.add("focused");
            } else {
                div.classList.remove("focused");
            }
        });
        // get text of hovered element
        let focusedElement = document.querySelector(".focused");
        let songName = focusedElement?.firstElementChild
            ? focusedElement?.firstElementChild.textContent
            : "";
        let currentPack = focusedElement?.textContent;
        // get song details of hovered element
        if (openPack && songName && songName !== openPack) {
            let focusedData = packDict[openPack].songs[songName];
            if (focusedData) {
                updateFocus(focusedData, "song");
            }
        } else if (currentPack) {
            let focusedData = packDict[currentPack];
            if (focusedData) {
                updateFocus(focusedData, "pack");
            }
        }
    }

    const handleHover = (event: MouseEvent) => {
        if (scrollable.length === 0) {
            return;
        }
        // update current index on hover
        currentIndex = scrollable.findIndex((div) =>
            div.contains(event.target as Node),
        );
        handleNavigation();
    };
</script>

<div
    id="packs"
    class="w-screen md:w-1/2 h-full flex flex-col bg-navy z-1 overflow-y-auto"
    bind:this={listContainer}
>
    <ul>
        <!-- <li class="font-semibold text-darknavy text-center bg-yellow-500">
        Note: the current songlist is a placeholder and it will be up to date
        soon.
      </li> -->
        {#each Object.entries(packDict).sort( ([, a], [, b]) => a.name.localeCompare(b.name), ) as [_, packDetails]}
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
    </ul>
</div>
