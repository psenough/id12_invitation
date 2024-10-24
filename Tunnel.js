function Tunnel(resr, resl, nof)
{
	this.npoints = (resr + 1) * resl;
	var vbuffer = new Float32Array(this.npoints * 4);
	//var t = Math.log(nof) / Math.log(2) / (1 - resl);	//var t = Math.log(nof) / Math.log(2) / (2 - resl);
	var t0 = -1.0 + (nof);
	var t1 = nof;
	var l = Math.cos(Math.PI / (resr + 1));
	var p = 0;

	for(var j = 0; j < resl; ++j)
	{
		//var z = -Math.pow(2.0, (j + 1 - resl) * t);
		var z = -j / (resl - 1);
		z = z * z * t0 + t1;

		for(var i = 0; i <= resr; ++i)
		{
			var r = i / resr * 6.28318530718;

			vbuffer[p++] = l * Math.cos(r);			// x
			vbuffer[p++] = l * Math.sin(r);			// y
			vbuffer[p++] = z;						// z
			vbuffer[p++] = i / resr;				// u
		}
	}

	this.vbo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
	gl.bufferData(gl.ARRAY_BUFFER, vbuffer, gl.STATIC_DRAW);

	this.nstrips = resl - 1;
	this.striplen = 2 * resr + 2;
	var ibuffer = new Uint16Array(this.nstrips * this.striplen);
	p = 0;

	for(var j = 0; j < this.nstrips; ++j)
	{
		for(var i = 0; i <= resr; ++i)
		{
			ibuffer[p++] = (j + 1) * (resr + 1) + i;
			ibuffer[p++] = j * (resr + 1) + i;
		}
	}

	this.ibo = gl.createBuffer();	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ibuffer, gl.STATIC_DRAW);

	//


	this.Draw = function()
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
		gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);

		for(var i = 0; i < this.nstrips; ++i)
			gl.drawElements(gl.TRIANGLE_STRIP, this.striplen, gl.UNSIGNED_SHORT, 2 * i * this.striplen);
	};


	this.DrawPoints = function()
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
		gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);

		gl.drawArrays(gl.LINE_STRIP, 0, this.npoints);
	};
}