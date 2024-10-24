precision highp float;

uniform sampler2D N, A;

varying vec3 v;
varying vec2 t;
varying mat3 nbt;

void main()
{
	vec3 view = normalize(v);
	vec3 n = normalize((texture2D(N, t).xyz * 2.0 - 1.0) * nbt);
	gl_FragColor = texture2D(A, t) * (max(vec4(0.0), -dot(n, view)) + vec4(0.125, 0.0625, 0.03125, 0.0));	//vec4(n * 0.5 + 0.5, 0);//
}