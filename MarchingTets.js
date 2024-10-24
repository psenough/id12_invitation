function MarchingTets(xres, yres, zres)
{
	this.SetField = function(F)
	{
		var i = 0;

		for(var z = 0; z < this.zres; ++z)
			for(var y = 0; y < this.yres; ++y)
				for(var x = 0; x < this.xres; ++x)
					this.field[i++] = F(x, y, z);
	};

	this.PushTriangle = function(i0, i1, i2, i3)
	{
		this.vbuffer[this.vbufferp++] = i0;
		this.vbuffer[this.vbufferp++] = this.field[i0];
		this.vbuffer[this.vbufferp++] = i1;
		this.vbuffer[this.vbufferp++] = this.field[i1];

		this.vbuffer[this.vbufferp++] = i0;
		this.vbuffer[this.vbufferp++] = this.field[i0];
		this.vbuffer[this.vbufferp++] = i2;
		this.vbuffer[this.vbufferp++] = this.field[i2];

		this.vbuffer[this.vbufferp++] = i0;
		this.vbuffer[this.vbufferp++] = this.field[i0];
		this.vbuffer[this.vbufferp++] = i3;
		this.vbuffer[this.vbufferp++] = this.field[i3];
	};

	this.PushQuad = function(i0, i1, i2, i3)
	{
		this.vbuffer[this.vbufferp++] = i0;
		this.vbuffer[this.vbufferp++] = this.field[i0];
		this.vbuffer[this.vbufferp++] = i2;
		this.vbuffer[this.vbufferp++] = this.field[i2];

		this.vbuffer[this.vbufferp++] = i1;
		this.vbuffer[this.vbufferp++] = this.field[i1];
		this.vbuffer[this.vbufferp++] = i2;
		this.vbuffer[this.vbufferp++] = this.field[i2];

		this.vbuffer[this.vbufferp++] = i0;
		this.vbuffer[this.vbufferp++] = this.field[i0];
		this.vbuffer[this.vbufferp++] = i3;
		this.vbuffer[this.vbufferp++] = this.field[i3];

		this.vbuffer[this.vbufferp++] = i0;
		this.vbuffer[this.vbufferp++] = this.field[i0];
		this.vbuffer[this.vbufferp++] = i3;
		this.vbuffer[this.vbufferp++] = this.field[i3];
		
		this.vbuffer[this.vbufferp++] = i1;
		this.vbuffer[this.vbufferp++] = this.field[i1];
		this.vbuffer[this.vbufferp++] = i2;
		this.vbuffer[this.vbufferp++] = this.field[i2];

		this.vbuffer[this.vbufferp++] = i1;
		this.vbuffer[this.vbufferp++] = this.field[i1];
		this.vbuffer[this.vbufferp++] = i3;
		this.vbuffer[this.vbufferp++] = this.field[i3];
	};

	this.DoTet = function(i0, b0, i1, b1, i2, b2, i3, b3)
	{
		/*if(b0)
		{
			if(b1)
			{
				if(b2)
				{
					if(!b3)
						this.PushTriangle(i3, i2, i1, i0);	// 1110 - 14
				}
				else
				{
					if(b3)
						this.PushTriangle(i2, i0, i1, i3);	// 1101 - 13
					else
						this.PushQuad(i0, i1, i2, i3);		// 1100 - 12
				}
			}
			else
			{
				if(b2)
				{
					if(b3)
						this.PushTriangle(i1, i3, i2, i0);	// 1011 - 11
					else
						this.PushQuad(i0, i2, i3, i1);		// 1010 - 10
				}
				else
				{
					if(b3)
						this.PushQuad(i0, i3, i1, i2);		// 1001 - 9
					else
						this.PushTriangle(i0, i3, i2, i1);	// 1000 - 8
				}
			}
		}
		else
		{
			if(b1)
			{
				if(b2)
				{
					if(b3)
						this.PushTriangle(i0, i1, i2, i3);	// 0111 - 7
					else
						this.PushQuad(i0, i3, i2, i1);		// 0110 - 6
				}
				else
				{
					if(b3)
						this.PushQuad(i0, i2, i1, i3);		// 0101 - 5
					else
						this.PushTriangle(i1, i0, i2, i3);	// 0100 - 4
				}
			}
			else
			{
				if(b2)
				{
					if(b3)
						this.PushQuad(i3, i2, i1, i0);		// 0011 - 3
					else
						this.PushTriangle(i2, i3, i1, i0);	// 0010 - 2
				}
				else
				{
					if(b3)
						this.PushTriangle(i3, i0, i1, i2);	// 0001 - 1
				}
			}
		}*/

		var t = b3 | (b2 << 1) | (b1 << 2) | (b0 << 3);
		
		switch(t)
		{
		case 14:
			this.PushTriangle(i3, i2, i1, i0);	// 1110 - 14
			break;
		
		case 13:
			this.PushTriangle(i2, i0, i1, i3);	// 1101 - 13
			break;
		
		case 12:
			this.PushQuad(i0, i1, i2, i3);		// 1100 - 12
			break;

		case 11:
			this.PushTriangle(i1, i3, i2, i0);	// 1011 - 11
			break;

		case 10:
			this.PushQuad(i0, i2, i3, i1);		// 1010 - 10
			break;

		case 9:
			this.PushQuad(i0, i3, i1, i2);		// 1001 - 9
			break;

		case 8:
			this.PushTriangle(i0, i3, i2, i1);	// 1000 - 8
			break;

		case 7:
			this.PushTriangle(i0, i1, i2, i3);	// 0111 - 7
			break;

		case 6:
			this.PushQuad(i0, i3, i2, i1);		// 0110 - 6
			break;

		case 5:
			this.PushQuad(i0, i2, i1, i3);		// 0101 - 5
			break;

		case 4:
			this.PushTriangle(i1, i0, i2, i3);	// 0100 - 4
			break;

		case 3:
			this.PushQuad(i3, i2, i1, i0);		// 0011 - 3
			break;

		case 2:
			this.PushTriangle(i2, i3, i1, i0);	// 0010 - 2
			break;

		case 1:
			this.PushTriangle(i3, i0, i1, i2);	// 0001 - 1
		}
	};

	this.Update = function(threshold)
	{
		this.vbufferp = 0;
		var t = 0;

		for(var z = 0; z < this.mz; z += this.xyres)
			for(var y = 0; y < this.my; y += this.xres)
				for(var x = 0; x < (this.xres - 1); x += 1)
				{
					t ^= 1;

					var i0 = z + y + x + t;
					var i1 = i0 + 1 - (t << 1);
					var i2 = i0 + this.xres;
					var i3 = i1 + this.xres;
					var i4 = i0 + this.xyres;
					var i5 = i1 + this.xyres;
					var i6 = i2 + this.xyres;
					var i7 = i3 + this.xyres;

					var b0 = (this.field[i0] >= threshold) ^ t;
					var b1 = (this.field[i1] >= threshold) ^ t;
					var b2 = (this.field[i2] >= threshold) ^ t;
					var b3 = (this.field[i3] >= threshold) ^ t;
					var b4 = (this.field[i4] >= threshold) ^ t;
					var b5 = (this.field[i5] >= threshold) ^ t;
					var b6 = (this.field[i6] >= threshold) ^ t;
					var b7 = (this.field[i7] >= threshold) ^ t;

					this.DoTet(i1, b1, i0, b0, i3, b3, i5, b5);
					this.DoTet(i2, b2, i6, b6, i3, b3, i0, b0);
					this.DoTet(i4, b4, i5, b5, i6, b6, i0, b0);
					this.DoTet(i6, b6, i3, b3, i0, b0, i5, b5);
					this.DoTet(i7, b7, i3, b3, i6, b6, i5, b5);

					/*var i0 = z + y + x;
					var i1 = i0 + 1;
					var i2 = i0 + this.xres;
					var i3 = i1 + this.xres;
					var i4 = i0 + this.xyres;
					var i5 = i1 + this.xyres;
					var i6 = i2 + this.xyres;
					var i7 = i3 + this.xyres;
					
					var b0 = this.field[i0] >= threshold;
					var b1 = this.field[i1] >= threshold;
					var b2 = this.field[i2] >= threshold;
					var b3 = this.field[i3] >= threshold;
					var b4 = this.field[i4] >= threshold;
					var b5 = this.field[i5] >= threshold;
					var b6 = this.field[i6] >= threshold;
					var b7 = this.field[i7] >= threshold;
					
					this.DoTet(i7, b7, i5, b5, i3, b3, i2, b2);
					this.DoTet(i5, b5, i1, b1, i3, b3, i2, b2);
					this.DoTet(i5, b5, i1, b1, i2, b2, i0, b0);
					this.DoTet(i7, b7, i5, b5, i2, b2, i6, b6);
					this.DoTet(i5, b5, i2, b2, i6, b6, i4, b4);
					this.DoTet(i2, b2, i5, b5, i0, b0, i4, b4);*/
				}

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vbuffer.subarray(0, this.vbufferp));

		if(this.vbufferp > this.vbuffer.length)
		{
			this.vbuffer = new Float32Array(this.vbufferp);
			gl.bufferData(gl.ARRAY_BUFFER, this.vbuffer.length << 2, gl.DYNAMIC_DRAW);
		}
	};

	this.Draw = function()
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
		gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);	//gl.vertexAttribPointer(0, 4, gl.UNSIGNED_SHORT, false, 0, 0);
		gl.drawArrays(gl.TRIANGLES, 0, this.vbufferp >> 2);
	};

	this.xres = xres;
	this.yres = yres;
	this.zres = zres;
	this.xyres = this.xres * this.yres;
	this.mz = (this.zres - 1) * this.xyres;
	this.my = (this.yres - 1) * this.xres;

	this.r = new Float32Array(4);
	this.r[0] = this.xres;
	this.r[1] = 1.0 / this.xres;
	this.r[2] = this.yres;
	this.r[3] = 1.0 / this.xyres;

	this.field = new Float32Array(this.xres * this.yres * this.zres);			//new Uint16Array(this.xres * this.yres * this.zres);
	this.vbuffer = new Float32Array((this.xres - 1) * (this.yres - 1) * 120);	//new Uint16Array((this.xres - 1) * (this.yres - 1) * 120);	

	this.vbo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
	gl.bufferData(gl.ARRAY_BUFFER, this.vbuffer.length << 2, gl.DYNAMIC_DRAW);	//gl.bufferData(gl.ARRAY_BUFFER, this.vbuffer.length << 1, gl.DYNAMIC_DRAW);
}