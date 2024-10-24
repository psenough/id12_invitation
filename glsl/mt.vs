attribute vec4 A0;
uniform float t;
uniform vec4 res;	// res.x, 1/res.x, res.y, 1/(res.x * res.y)
uniform mat4 m;
varying vec3 p;

void main()
{
	// i = z * res.x * res.y + y * res.x + x;

	float x0 = mod(A0.x, res.x);
	float y0 = mod((A0.x - x0) * res.y, res.z);
	float z0 = (A0.x - x0 - y0) * res.w;
	vec3 p0 = vec3(x0, y0, z0);

	float x1 = mod(A0.z, res.x);
	float y1 = mod((A0.z - x1) * res.y, res.z);
	float z1 = (A0.z - x1 - y1) * res.w;
	vec3 p1 = vec3(x1, y1, z1);

	p = mix(p0, p1, (A0.y - t) / (A0.y - A0.w));

	gl_Position = m * vec4(p, 1.0);
}