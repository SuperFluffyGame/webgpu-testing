import {
    device,
    format,
    context,
    canvas,
    canvas2context,
    canvas2,
    mouseImage,
    mouseCanvas,
    mouseCanvasContext,
} from "./init.js";
import { matrixBuffer, bindGroup, isMouseOverBuffer } from "./bindings.js";
import { pipeline } from "./pipeline.js";
import * as DATA from "./data.js";
import { createGPUBuffer } from "./util.js";
import { grassTexture } from "./textures.js";
import { mouseOffset } from "../inputs.js";

const cubeGeo = DATA.unitCubeVertex();
const cubeColor = DATA.unitCubeColor();
const cubeUV = DATA.unitCubeUV();

const texture1 = device.createTexture({
    size: [canvas.width, canvas.height],
    sampleCount: DATA.sampleCount,
    format,
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

const texture2 = device.createTexture({
    size: [canvas2.width, canvas2.height],
    sampleCount: DATA.sampleCount,
    format,
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

const textureView = texture1.createView();
const textureView2 = texture2.createView();

let prevTime = 0;
export function render(timestamp: number) {
    requestAnimationFrame(render);
    mouseImage.src = canvas2.toDataURL();
    mouseCanvasContext?.drawImage(mouseImage, 0, 0);

    const dt = timestamp - prevTime;
    prevTime = timestamp;
    // console.log(dt);

    //update vertex pos to mouse pos
    // triGeo[0] = mouse.x;
    // triGeo[1] = mouse.y;
    // device.queue.writeBuffer(positionAttrib.buffer, 0, triGeo);
    let col = mouseCanvasContext?.getImageData(
        mouseOffset.x,
        mouseOffset.y,
        1,
        1
    ).data as Uint8ClampedArray;

    if (col[0] === 255) {
        device.queue.writeBuffer(isMouseOverBuffer, 0, new Float32Array([1]));
    } else {
        device.queue.writeBuffer(isMouseOverBuffer, 0, new Float32Array([0]));
    }
    const transformationMatrix = DATA.getTransformationMatrix();
    const commandEncoder = device.createCommandEncoder();

    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [
            {
                view: textureView,
                resolveTarget: context.getCurrentTexture().createView(),

                // view: context.getCurrentTexture().createView(),

                clearValue: { r: 0, g: 0, b: 0, a: 1 },
                loadOp: "clear",
                storeOp: "store",
            },
            {
                view: textureView2,
                resolveTarget: canvas2context.getCurrentTexture().createView(),

                // view: context.getCurrentTexture().createView(),

                clearValue: { r: 0, g: 0, b: 0, a: 1 },
                loadOp: "clear",
                storeOp: "store",
            },
        ],
    });

    device.queue.writeBuffer(matrixBuffer, 0, transformationMatrix);

    renderPass.setPipeline(pipeline);
    // renderPass.setBindGroup(0, bindGroup);

    renderPass.setBindGroup(0, bindGroup);

    renderPass.setVertexBuffer(0, createGPUBuffer(device, cubeGeo));
    renderPass.setVertexBuffer(1, createGPUBuffer(device, cubeColor));
    renderPass.setVertexBuffer(2, createGPUBuffer(device, cubeUV));

    renderPass.draw(36);

    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
}
