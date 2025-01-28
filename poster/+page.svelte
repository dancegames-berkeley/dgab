<script lang="ts">
    import { onMount } from "svelte";
    import { drawArrows } from "../../lib/drawarrowsbg";
    import QRCode from "qrcode";
    import colors from "tailwindcss/colors";

    onMount(() => {
        QRCode.toCanvas(
            document.getElementById("qrcode") as HTMLCanvasElement,
            "https://discord.gg/DzhkQasw3C",
            {
                width: 256,
                color: {
                    dark: colors.white,
                    light: "#071424",
                },
                errorCorrectionLevel: "H",
            },
            function (error) {
                if (error) console.error(error);
            },
        );

        const canvas = document.getElementById("arrowsbg") as HTMLCanvasElement;
        const section = document.getElementById("content") as HTMLElement;

        drawArrows(canvas, section);

        // redraw on window resize
        const handleResize = () => drawArrows(canvas, section);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });
</script>

<!-- draw a 1080x1920 canvas and fill with arrowsbg -->
<section class="flex items-center justify-center relative bg-black">
    <div id="content" class="w-[1080px] h-[1920px] relative">
        <canvas id="arrowsbg" width="1080" height="1920" class="bg-darknavy z-0"
        ></canvas>
        <p
            class="absolute top-10 left-10 text-8xl text-white mb-4 font-daysone"
        >
            <span class="text-yellow-500">DANCE GAMES</span> <br />
            <span class="text-blue-800">@</span>
            <span class="text-blue-500">BERKELEY</span>
        </p>
        <div
            class="absolute inset-0 flex flex-col items-center justify-center z-10"
        >
            <div class="relative">
                <canvas id="qrcode" width="256" height="256" class="z-10"
                ></canvas>
                <i
                    class="bi bi-discord qrcode-translate text-4xl text-white rounded-full border-4 p-2 border-darknavy bg-darknavy z-20"
                ></i>
            </div>
        </div>
    </div>
</section>

<style>
    .qrcode-translate {
        @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
    }
</style>
