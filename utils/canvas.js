// Initializing Canvas
export const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

canvas.style.cursor = "crosshair";

// Initializing 2D Context (bit like magic pen to draw inside the canvas)
export const c = canvas.getContext("2d");
