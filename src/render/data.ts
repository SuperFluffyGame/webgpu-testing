import { mat4, vec3 } from "../gl-matrix/index.js";
import { rotation, camera } from "../controls.js";
import { canvas } from "./init.js";

export const sampleCount = 4;

export function unitCubeVertex() {
    return new Float32Array([
        1, -1, 1, 1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, -1,
        -1, -1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1, 1, 1, 1, 1,
        1, 1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, -1, 1, -1, 1, -1,
        1, 1, 1, 1, 1, -1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, 1, -1, 1, -1, -1,
        -1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1, -1, 1, 1, 1, -1, -1, 1,
        1, -1, -1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, 1,
        -1, 1, -1, 1, 1, 1, -1, 1, 1, -1, -1, 1, -1, 1, -1, 1,
    ]);
}

export function unitCubeColor() {
    return new Float32Array([
        1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1,
        0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1,
        1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1,
    ]);
}

export function unitCubeUV() {
    return new Float32Array([
        1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0,
        1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0,
        1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0,
    ]);
}

const aspect = canvas.width / canvas.height;
const projectionMatrix = mat4.create();
mat4.perspectiveZO(projectionMatrix, (2 * Math.PI) / 5, aspect, 0, 1);

// mat4.ortho(projectionMatrix, -10, 10, -10, 10, 0, 10);

export function getTransformationMatrix() {
    const viewMatrix = mat4.create();

    mat4.rotateX(viewMatrix, viewMatrix, rotation[1]);
    mat4.rotateY(viewMatrix, viewMatrix, rotation[0]);
    mat4.translate(viewMatrix, viewMatrix, vec3.fromValues(0, 0, -4));
    mat4.translate(viewMatrix, viewMatrix, camera);

    const modelViewProjectionMatrix = mat4.create();
    mat4.multiply(modelViewProjectionMatrix, projectionMatrix, viewMatrix);

    mat4.transpose(modelViewProjectionMatrix, modelViewProjectionMatrix);

    return modelViewProjectionMatrix as Float32Array;
}

export async function getGrassImage() {
    const grassHtmlImage = new Image(16, 16);
    grassHtmlImage.src = "../images/grass.png";
    await grassHtmlImage.decode();
    return createImageBitmap(grassHtmlImage);
}
