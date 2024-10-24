precision highp float;

uniform sampler2D T;
uniform float t;

varying vec3 n, p;

void main()
{
	vec3 dir = reflect(normalize(p), normalize(n));

	gl_FragColor = texture2D(T, vec2(0.25/dir.z - t, 0.31830988618379 * atan(dir.y, dir.x))) * vec4(0.625, 0.5625, 0.53125, 0.0);
}