uniform mat4 m, nm;
uniform vec3 s, b;

attribute vec3 A0, A1;

varying vec3 n, p;

void main()
{
	vec4 t = vec4(A0 * s + b, 1.0);
	gl_Position = m * t;
	p = (nm * t).xyz;
	n = mat3(nm) * normalize(A1 * 2.0 - 1.0);
}