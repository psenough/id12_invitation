precision lowp float;

varying vec3 p;

uniform vec4 mb[10];

void main()
{
	vec3 n;

	for(int i = 0; i < 10; ++i)
		n += mb[i].w * (p - mb[i].xyz) * pow(distance(p, mb[i].xyz), -4.0);

	n = normalize(n);
	
	gl_FragColor = vec4(n * 0.5 + 0.5, 0.0);
}