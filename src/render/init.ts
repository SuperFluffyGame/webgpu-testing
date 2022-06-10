import { initWG } from "./util.js";
export const canvas = document.getElementById("c") as HTMLCanvasElement;
export const canvas2 = document.getElementById("c2") as HTMLCanvasElement;
export const canvas2context = canvas2.getContext("webgpu") as GPUCanvasContext;

export const mouseImage = new Image(canvas.width, canvas.height);
export const mouseCanvas = document.createElement("canvas");
mouseCanvas.width = canvas.width;
mouseCanvas.height = canvas.height;
export const mouseCanvasContext = mouseCanvas.getContext("2d");
document.body.appendChild(mouseCanvas);

export const { adapter, device, context, format } = await initWG(canvas);
canvas2context.configure({ device, format: "rgba8unorm", alphaMode: "opaque" });
