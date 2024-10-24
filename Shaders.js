var shader = [];


function CompileProgram()
{
	var program = gl.createProgram();

	gl.bindAttribLocation(program, 0, "A0");
	gl.bindAttribLocation(program, 1, "A1");
	gl.bindAttribLocation(program, 2, "A2");

	for(var i = 0; i < arguments.length; ++i)
		gl.attachShader(program, arguments[i]);

	gl.linkProgram(program);

	if(!gl.getProgramParameter(program, gl.LINK_STATUS))
	{
		alert(gl.getProgramInfoLog(program));
		return 0;
    }

	return program;
}


function CompileShader(type, str)
{
	var shader = gl.createShader(type);
	gl.shaderSource(shader, str);
	gl.compileShader(shader);
	
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
	{
		alert(gl.getShaderInfoLog(shader));
		return 0;
	}
	else
		return shader;
}


function CompileShaders()
{
	var vs, fs;
	
	// TEXTURE
	vs = CompileShader(gl.VERTEX_SHADER, shadersstr[0]);
	fs = CompileShader(gl.FRAGMENT_SHADER, shadersstr[1]);
	shader[0] = CompileProgram(fs, vs);
	if(!shader[0])
		return false;

	// METABALLS
	vs = CompileShader(gl.VERTEX_SHADER, shadersstr[2]);
	fs = CompileShader(gl.FRAGMENT_SHADER, shadersstr[3]);
	shader[1] = CompileProgram(fs, vs);
	if(!shader[1])
		return false;
	
	// TUNNEL
	vs = CompileShader(gl.VERTEX_SHADER, shadersstr[4]);
	fs = CompileShader(gl.FRAGMENT_SHADER, shadersstr[5]);
	shader[2] = CompileProgram(fs, vs);
	if(!shader[2])
		return false;

	// GLOW HORIZONTAL
	vs = CompileShader(gl.VERTEX_SHADER, shadersstr[0]);
	fs = CompileShader(gl.FRAGMENT_SHADER, shadersstr[6]);
	shader[3] = CompileProgram(fs, vs);
	if(!shader[3])
		return false;

	// GLOW VERTICAL
	vs = CompileShader(gl.VERTEX_SHADER, shadersstr[0]);
	fs = CompileShader(gl.FRAGMENT_SHADER, shadersstr[7]);
	shader[4] = CompileProgram(fs, vs);
	if(!shader[4])
		return false;

	// tunnel reflection 3D
	vs = CompileShader(gl.VERTEX_SHADER, shadersstr[8]);
	fs = CompileShader(gl.FRAGMENT_SHADER, shadersstr[10]);
	shader[5] = CompileProgram(fs, vs);
	if(!shader[5])
		return false;
		
	// jap
	vs = CompileShader(gl.VERTEX_SHADER, shadersstr[11]);
	fs = CompileShader(gl.FRAGMENT_SHADER, shadersstr[12]);
	shader[6] = CompileProgram(fs, vs);
	if(!shader[6])
		return false;

	return true;
}
