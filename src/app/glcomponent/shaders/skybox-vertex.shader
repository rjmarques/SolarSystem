varying vec2 vUV;
varying float vDensity;
varying float vDiff;

void main() {
	vUV = uv;
	vec4 pos = vec4(position, 1.0);
	gl_Position = projectionMatrix * modelViewMatrix * pos;
}
