import { getGrassImage } from "./data.js";
import { device } from "./init.js";
const grassImage = await getGrassImage();

export const sampler = device.createSampler({
    minFilter: "nearest",
    magFilter: "nearest",
});
export const grassTexture = device.createTexture({
    format: "rgba8unorm",
    size: [grassImage.width, grassImage.height],
    usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
});

device.queue.copyExternalImageToTexture(
    { source: grassImage },
    { texture: grassTexture },
    [grassImage.width, grassImage.height]
);
