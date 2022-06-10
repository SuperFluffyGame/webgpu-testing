import { device } from "./init.js";
import { sampler, grassTexture } from "./textures.js";
export const matrixBuffer = device.createBuffer({
    size: 64,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});
export const isMouseOverBuffer = device.createBuffer({
    size: 4,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});
export const bindGroupLayout = device.createBindGroupLayout({
    entries: [
        {
            binding: 0,
            visibility: GPUShaderStage.VERTEX,
            buffer: {
                type: "uniform",
            },
        },
        {
            binding: 1,
            visibility: GPUShaderStage.FRAGMENT,
            sampler: {},
        },
        {
            binding: 2,
            visibility: GPUShaderStage.FRAGMENT,
            texture: {},
        },
        {
            binding: 3,
            visibility: GPUShaderStage.FRAGMENT,
            buffer: {
                type: "uniform",
            },
        },
    ],
});
export const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [
        {
            binding: 0,
            resource: {
                buffer: matrixBuffer,
            },
        },
        {
            binding: 1,
            resource: sampler,
        },
        {
            binding: 2,
            resource: grassTexture.createView(),
        },
        {
            binding: 3,
            resource: {
                buffer: isMouseOverBuffer,
            },
        },
    ],
});
