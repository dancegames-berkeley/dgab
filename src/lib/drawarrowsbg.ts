import { generateArrow } from "./arrow";

export function drawArrows(canvas: HTMLCanvasElement | null, section: HTMLElement | null) {
    if (canvas && section) {
        const width = section.clientWidth;
        const height = section.clientHeight;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
            const arrowSize = 50;
            const padding = 15;
            const totalsize = arrowSize + padding;
            const cols = Math.ceil(width / totalsize);
            const rows = Math.ceil(height / totalsize);

            ctx.clearRect(0, 0, width, height);

            for (let col = 0; col < cols; col++) {
                for (let row = 0; row < rows; row++) {
                    generateArrow(
                        ctx,
                        col * totalsize + totalsize / 2,
                        row * totalsize + totalsize / 2,
                        arrowSize,
                    );
                }
            }
        }
    }
}