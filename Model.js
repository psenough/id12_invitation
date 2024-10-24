function Model(arraybuffer)
{
	this.Draw = function()
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
		
		gl.vertexAttribPointer(0, 3, gl.UNSIGNED_SHORT, false, this.stride, 0);

		switch(this.stride)
		{
		case 12:
			gl.vertexAttribPointer(1, 3, gl.UNSIGNED_SHORT, true, this.stride, 6);
			gl.enableVertexAttribArray(1);
			break;

		case 16:
			gl.vertexAttribPointer(1, 3, gl.UNSIGNED_SHORT, true, this.stride, 6);
			gl.enableVertexAttribArray(1);
			gl.vertexAttribPointer(2, 2, gl.UNSIGNED_SHORT, true, this.stride, 12);
			gl.enableVertexAttribArray(2);
			break;

		case 10:
			gl.vertexAttribPointer(2, 2, gl.UNSIGNED_SHORT, true, this.stride, 6);
			gl.enableVertexAttribArray(2);
			break;
		}
		
		gl.drawArrays(gl.TRIANGLES, 0, 3 * this.ntriangles);
		
		switch(this.stride)
		{
		case 12:
			gl.disableVertexAttribArray(1);
			break;

		case 16:
			gl.disableVertexAttribArray(1);
			gl.disableVertexAttribArray(2);
			break;

		case 10:
			gl.disableVertexAttribArray(2);
			break;
		}
	}

	var floatarray = new Float32Array(arraybuffer, 0, 6);
	var shortarray = new Uint16Array(arraybuffer, 4 * 6);

	this.scale = [floatarray[0], floatarray[2], floatarray[4]];
	this.bias = [floatarray[1], floatarray[3], floatarray[5]];

	var nvertices = shortarray[0];
	var nnormals = shortarray[1];
	var ntexcoords = shortarray[2];
	this.ntriangles = shortarray[3];

	//alert("N vertices: " + nvertices + "\nN normals: " + nnormals + "\nN Texture Coordinates: " + ntexcoords + "\nN Triangles: " + this.ntriangles);

	var ivertices = 4;
	var inormals = ivertices + nvertices * 3;
	var itexcoords = inormals + nnormals * 3;
	var itriangles = itexcoords + ntexcoords * 2;
	var stride = 3;
	if(nnormals != 0)
		stride += 3;
	if(ntexcoords != 0)
		stride += 3;

	var buffer = [];
	var t = 0;

	for(var i = 0; i < this.ntriangles; ++i)
	{
		var v0 = shortarray[itriangles + i * stride + 0];
		var v1 = shortarray[itriangles + i * stride + 1];
		var v2 = shortarray[itriangles + i * stride + 2];

		var n0, n1, n2;
		var t0, t1, t2;

		if(nnormals != 0)
		{
			n0 = shortarray[itriangles + i * stride + 3];
			n1 = shortarray[itriangles + i * stride + 4];
			n2 = shortarray[itriangles + i * stride + 5];
		}
		
		if(ntexcoords != 0)
		{
			t0 = shortarray[itriangles + i * stride + 6];
			t1 = shortarray[itriangles + i * stride + 7];
			t2 = shortarray[itriangles + i * stride + 8];
		}

		buffer[t++] = shortarray[ivertices + v0 * 3 + 0];
		buffer[t++] = shortarray[ivertices + v0 * 3 + 1];
		buffer[t++] = shortarray[ivertices + v0 * 3 + 2];

		if(nnormals != 0)
		{
			buffer[t++] = shortarray[inormals + n0 * 3 + 0];
			buffer[t++] = shortarray[inormals + n0 * 3 + 1];
			buffer[t++] = shortarray[inormals + n0 * 3 + 2];
		}

		if(ntexcoords != 0)
		{
			buffer[t++] = shortarray[itexcoords + t0 * 2 + 0];
			buffer[t++] = shortarray[itexcoords + t0 * 2 + 1];
		}

		buffer[t++] = shortarray[ivertices + v1 * 3 + 0];
		buffer[t++] = shortarray[ivertices + v1 * 3 + 1];
		buffer[t++] = shortarray[ivertices + v1 * 3 + 2];

		if(nnormals != 0)
		{
			buffer[t++] = shortarray[inormals + n1 * 3 + 0];
			buffer[t++] = shortarray[inormals + n1 * 3 + 1];
			buffer[t++] = shortarray[inormals + n1 * 3 + 2];
		}

		if(ntexcoords != 0)
		{
			buffer[t++] = shortarray[itexcoords + t1 * 2 + 0];
			buffer[t++] = shortarray[itexcoords + t1 * 2 + 1];
		}

		buffer[t++] = shortarray[ivertices + v2 * 3 + 0];
		buffer[t++] = shortarray[ivertices + v2 * 3 + 1];
		buffer[t++] = shortarray[ivertices + v2 * 3 + 2];

		if(nnormals != 0)
		{
			buffer[t++] = shortarray[inormals + n2 * 3 + 0];
			buffer[t++] = shortarray[inormals + n2 * 3 + 1];
			buffer[t++] = shortarray[inormals + n2 * 3 + 2];
		}

		if(ntexcoords != 0)
		{
			buffer[t++] = shortarray[itexcoords + t2 * 2 + 0];
			buffer[t++] = shortarray[itexcoords + t2 * 2 + 1];
		}
	}
	
	this.stride = 6;
	if(nnormals != 0)
		this.stride += 6;
	if(ntexcoords != 0)
		this.stride += 4;

	this.vbo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Uint16Array(buffer), gl.STATIC_DRAW);
}