precision highp float;

uniform sampler2D N, P;
uniform float time;

varying vec2 t;

void main()
{
	vec2 c = vec2(time, 0.25 * 0.31830988618379 * atan(t.y, t.x));
	float r = texture2D(N, c).r;
	gl_FragColor = texture2D(P, vec2(r, 0.0));
}