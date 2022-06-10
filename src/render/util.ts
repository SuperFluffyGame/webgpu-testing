export async function initWG(
    canvas: HTMLCanvasElement,
    format: GPUTextureFormat = "rgba8unorm",
    alphaMode: GPUCanvasAlphaMode = "opaque"
) {
    if (!("gpu" in navigator)) throw "WEBGPU not supported.";

    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter?.requestDevice();
    const context = canvas.getContext("webgpu");
    if (!adapter || !device || !context) throw "Something broke";

    context.configure({ device, format, alphaMode });

    return { adapter, device, context, format };
}

export function createGPUBuffer(
    device: GPUDevice,
    data: Float32Array,
    usageFlag: GPUBufferUsageFlags = GPUBufferUsage.VERTEX |
        GPUBufferUsage.COPY_DST,
    size: number = data.byteLength
) {
    const buffer = device.createBuffer({
        size,
        usage: usageFlag,
        mappedAtCreation: true,
    });
    new Float32Array(buffer.getMappedRange()).set(data);
    buffer.unmap();
    return buffer;
}
