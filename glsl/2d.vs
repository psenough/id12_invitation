attribute vec4 A0;

varying vec2 t;
uniform vec2 s, b;

void main()
{
	gl_Position = A0;
	t = A0.xy * s + b;
}