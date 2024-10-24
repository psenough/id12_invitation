var Quad =
{
	'vbo': 0,
	
	'Init': function()
	{
		var vertices =
		[
			-200.0, 300.0,
			-200.0, -200.0,
			300.0, -200.0
		];

		vbo = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	},
	
	'Draw': function()
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	}
}