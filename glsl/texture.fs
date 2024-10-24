precision lowp float;

uniform sampler2D T;

varying vec2 t;

void main()
{
	gl_FragColor = texture2D(T, t);
}