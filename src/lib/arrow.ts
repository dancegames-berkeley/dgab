interface Arrow {
    size: number;
    color: string;
    transparency: number;
    rotation: number;
}

export function generateArrow(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): Arrow {

    const arrow = {
        size: size,
        // TODO: for aesthetic - flickers on window resizes just because this is random. maybe hardcode a color patterning and iterate through (probably this) / seed (need to write a function since JS doesn't support seeding)
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
        transparency: 0.1,
        rotation: -Math.PI / 4,
    };

    drawArrow(ctx, arrow, x, y);

    return arrow;
}

function drawArrow(ctx: CanvasRenderingContext2D, arrow: Arrow, x: number, y: number): void {
    const { size, color, transparency, rotation } = arrow;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 4;
    ctx.globalAlpha = transparency;

    // draw arrow
    const coords = [
        [0, 63],
        [0, 80],
        [11, 89],
        [79, 89],
        [48, 119],
        [48, 131],
        [59, 143],
        [72, 143],
        [137, 72],
        [137, 65],
        [72, 0],
        [59, 0],
        [48, 12],
        [48, 23],
        [79, 54],
        [11, 54]
    ].map(([x, y]) => [x * size / 143, y * size / 143]);

    ctx.beginPath();
    ctx.moveTo(coords[0][0] - size / 2, coords[0][1] - size / 2); 
    coords.forEach(([x, y]) => {
        ctx.lineTo(x - size / 2, y - size / 2); 
    });
    ctx.closePath();
    ctx.stroke();
    
    ctx.restore();
}