// vertex shader
struct Uniforms {
  modelViewProjectionMatrix : mat4x4<f32>,
};
@binding(0) @group(0) var<uniform> uniforms : Uniforms;

struct Output {
    @builtin(position) Position : vec4<f32>,
    @location(0) vColor : vec4<f32>,
    @location(1) uv: vec2<f32>
};

@vertex
fn vs_main(
    @location(0) pos: vec4<f32>, 
    @location(1) color: vec4<f32>,
    @location(2) uv: vec2<f32>
) -> Output {

    var output: Output;
    output.Position = pos * uniforms.modelViewProjectionMatrix;
    output.vColor = color;
    output.uv = uv;

    return output;
}

// fragment shader
@group(0) @binding(1) var samp: sampler;
@group(0) @binding(2) var tex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> isMouseOver: f32;

struct fragOut {
    @location(0) mainOut: vec4<f32>,
    @location(1) secondOut: vec4<f32>
}

@fragment
fn fs_main(
    @location(0) vColor: vec4<f32>,
    @location(1) uv: vec2<f32>
) -> fragOut {
    var out: fragOut;
    out.mainOut = textureSample(tex, samp, uv) + isMouseOver / 8;
    out.secondOut = vec4<f32>(1,0,0,1);//textureSample(tex, samp, uv);
    return out;

}