precision highp float;

uniform sampler2D S;
uniform float ih;

varying vec2 t;

void main()
{	
	float o[3];
	o[0] = 0.0;
	o[1] = 1.3846153846;
	o[2] = 3.2307692308;
	
	float w[3];
	w[0] = 0.2270270270;
	w[1] = 0.3162162162;
	w[2] = 0.0702702703;

	//const float o[5] = float[](0.0, 98.0/68.0, 141.0/41.0, 130.0/24.0, 66.0/9.0);
	//const float w[5] = float[](51.0/335.0, 68.0/335.0, 41.0/335.0, 24.0/335.0, 9.0/335.0);

	gl_FragColor = texture2D(S, t) * w[0];

	for(int i=1; i<3; i++)
	{
		gl_FragColor += texture2D(S, t + ih * vec2(0.0, o[i])) * w[i];
		gl_FragColor += texture2D(S, t - ih * vec2(0.0, o[i])) * w[i];
	}
}