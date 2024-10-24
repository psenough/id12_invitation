attribute vec4 A0;

uniform mat4 mp;
uniform float len, time;
uniform vec2 q, a;

varying mat3 nbt;
varying vec3 v;
varying vec2 t;

void main()
{
	t = vec2(A0.z * 4.0 - time, A0.w * 1.0);

	v = A0.xyz * vec3(1.0, 1.0, len) + vec3(a, 0.0);

	vec2 r = mix(vec2(0.0), q, -A0.z);

	mat3 rot = mat3(cos(r.y),				0.0,		-sin(r.y),
					sin(r.x) * sin(r.y),	cos(r.x),	cos(r.y) * sin(r.x),
					cos(r.x) * sin(r.y),	-sin(r.x),	cos(r.x) * cos(r.y));

	vec3 no = normalize(vec3(A0.xy, 0.0));
	vec3 bi = normalize(vec3(0.0, 0.0, 1.0));
	vec3 ta = normalize(cross(bi, no));

	nbt = rot * mat3(no, ta, bi);

	v = rot * v;
	
	gl_Position = mp * vec4(v, 1.0);	
}