precision mediump float;

uniform sampler2D T;
uniform float time;

varying vec2 t;

void main()
{
	vec4 i = texture2D(T, t);
}