uniform vec3 uWaveDepthColor;
uniform vec3 uWaveSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplyer;
varying float vElevation;
varying vec3 vPos;
varying vec2 vUv;
void main() {
    vec3 mixFragColor = mix(uWaveDepthColor, uWaveSurfaceColor, vElevation * uColorMultiplyer + uColorOffset);
    gl_FragColor = vec4(mixFragColor, 1);
}