precision highp float;

varying vec3 n, p;

void main()
{
	gl_FragColor = vec4(-(dot(normalize(p), normalize(n))));
}