uniform sampler2D texture1;
uniform sampler2D texture2;

uniform float time;

varying vec2 vUv;

void main() {
	// calculating the noise variation
	vec4 noise = texture2D( texture2, vUv );
	
	vec2 T1 = vUv + vec2( 1.5, -1.5 ) * time  *0.02;
	vec2 T2 = vUv + vec2( -0.5, 2.0 ) * time * 0.01;

	T1.x -= noise.r * 2.0;
	T1.y += noise.g * 4.0;
	T2.x -= noise.g * 0.2;
	T2.y += noise.b * 0.2;

	float p = texture2D( texture2 , T1*2.0).a + 0.25;

	// adding the noise to the texture color
	vec4 color = texture2D( texture1, T2 );
	vec4 temp = color * 2.0 * ( vec4(p, p, p ,p) ) + ( color * color );

	gl_FragColor = temp;
}		