// Initializing Canvas & 2D Context
export const canvas = document.getElementById("gameCanvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

export const c = canvas.getContext("2d");

export const menuCanvas = document.getElementById("menuCanvas");
menuCanvas.width = innerWidth;
menuCanvas.height = innerHeight;

export const cM = menuCanvas.getContext("2d");
