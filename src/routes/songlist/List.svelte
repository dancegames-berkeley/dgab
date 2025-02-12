<script lang="ts">
    import { onMount } from "svelte";
    import type { PackDetails, FocusedSong } from "./types";
    // import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

    export let currentIndex: number;
    export let focusedSong: FocusedSong;
    export let packDict: { [key: string]: PackDetails } = {};

    let listContainer: HTMLElement;
    let scrollable: HTMLElement[] = [];
    let openPack: string | null = null; // state variable to track what pack is opened

    const REGION = import.meta.env.VITE_AWS_REGION;
    const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;

    // const s3Client = new S3Client({
    //     region: REGION,
    //     credentials: {
    //         accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    //         secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    //     }
    // });
    
    // const readImage = async (stream: ReadableStream): Promise<Blob> => {
    //     const reader = stream.getReader();
    //     const readableStream = new ReadableStream({
    //         start(controller) {
    //             function push() {
    //                 reader.read().then(({ done, value }) => {
    //                     if (done) {
    //                         controller.close();
    //                         return;
    //                     }
    //                     controller.enqueue(value);
    //                     push();
    //                 });
    //             }
    //             push();
    //         },
    //     });
    //     return await new Response(readableStream).blob();
    // };

    // async function fetchImage(banner: string): Promise<string | undefined> {
    //     console.log("Fetching image:", banner);
    //     try {
    //         const command = new GetObjectCommand({
    //             Bucket: BUCKET_NAME,
    //             Key: banner,
    //         });

    //         console.log("Sending command to S3:", command);
    //         const response = await s3Client.send(command);
    //         console.log("Received response from S3:", response);
    //         // read stream and convert to blob
    //         if (response.Body) {
    //             const blob = await readImage(response.Body as ReadableStream);
    //             return URL.createObjectURL(blob);
    //         } else {
    //             console.log("Error: response.Body is undefined");
    //             return "";
    //         }
    //     } catch (error) {
    //         console.log("Error fetching image:", error);
    //         return "";
    //     }
    // }

    onMount(() => {
        try {
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
                window.removeEventListener("keydown", handleKeydown);
                window.removeEventListener("keydown", handleEnter);
                window.removeEventListener("mousemove", handleHover);
            };
        } catch (e) {
            console.error("Error on mount: ", e);
        }
    });

    // updates CSS to show focus on the current element
    async function updateFocus() {
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
                // focusedSong.banner = (await fetchImage(packDetails.banner || "")) || "";
                focusedSong.banner = packDetails.banner || "";
                focusedSong.title = packDetails.name;
                focusedSong.artist = "";
                focusedSong.charts = [];
                break
            }
            for (const [_, songDetails] of Object.entries(packDetails.songs)) {
                if (
                    songDetails.title === childText &&
                    songDetails.pack === currentPack
                ) {
                    // focusedSong.banner = (await fetchImage(songDetails.banner || "")) || "";
                    focusedSong.banner = songDetails.banner || "";
                    focusedSong.title = songDetails.title;
                    focusedSong.artist = songDetails.artist;
                    focusedSong.charts = songDetails.charts;
                    break
                }
            }
        }
    }

    // on click show dropdown for all songs in pack
    function handleClick(packName: string) {
        openPack = openPack === packName ? null : packName;
        updateScrollable();
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
