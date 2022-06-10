import { device, format } from "./init.js";
import { mainShader } from "./shaders.js";
import { bindGroupLayout } from "./bindings.js";
import { attributes } from "./attributes.js";
import { sampleCount } from "./data.js";
export const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
});
export const pipeline = device.createRenderPipeline({
    vertex: {
        module: device.createShaderModule({
            code: mainShader,
        }),
        entryPoint: "vs_main",
        buffers: attributes,
    },
    fragment: {
        module: device.createShaderModule({
            code: mainShader,
        }),
        entryPoint: "fs_main",
        targets: [{ format }, { format }],
    },
    primitive: {
        topology: "triangle-list",
        cullMode: "back",
    },
    layout: pipelineLayout,
    multisample: {
        count: sampleCount,
    },
});
