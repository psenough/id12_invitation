var javascriptisshit;

function MetaBalls(nballs)
{
	this.Field = function(x, y, z)
	{
		var f = 0.0;

		for(var i = 0; i < javascriptisshit.nballs; ++i)
		{
			var tx = x - javascriptisshit.ball[i * 4 + 0];
			var ty = y - javascriptisshit.ball[i * 4 + 1];
			var tz = z - javascriptisshit.ball[i * 4 + 2];
			f += javascriptisshit.ball[i * 4 + 3] / (tx * tx + ty * ty + tz * tz);
		}

		return f;
	};

	this.Update = function()
	{
		if(OnBeat(8))
			this.threshold = Math.random() * Math.random();

		javascriptisshit = this;
		this.grid.SetField(this.Field);
		this.grid.Update(this.threshold);
	}

	this.Draw = function(vp)
	{
		var i = mat4.create();
		var j = mat4.create();
		mat4.identity(i);
		mat4.scale(i, [2.0/31.0, 2.0/31.0, 2.0/31.0]);
		mat4.translate(i, [-15.5, -15.5, -15.5]);

		mat4.multiply(vp, i, j);

		gl.useProgram(shader[1]);
		gl.uniform4fv(gl.getUniformLocation(shader[1], "res"), this.grid.r);
		gl.uniform4fv(gl.getUniformLocation(shader[1], "mb"), this.ball);
		gl.uniform1f(gl.getUniformLocation(shader[1], "t"), this.threshold);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[1], "m"), false, j);

		this.grid.Draw();
	};

	//

	this.grid = new MarchingTets(32, 32, 32);
	this.nballs = nballs;
	this.ball = new Float32Array(this.nballs * 4);
	this.ballv = new Float32Array(this.nballs * 3);
	this.threshold = 0.05;

	for(var i = 0; i < this.nballs; ++i)
	{
		this.ball[i * 4 + 0] = (32.0 - 1.0) * Math.random();
		this.ball[i * 4 + 1] = (32.0 - 1.0) * Math.random();
		this.ball[i * 4 + 2] = (32.0 - 1.0) * Math.random();
		this.ball[i * 4 + 3] = Math.random() * 2.0 - 1.0;
	}

	this.Update();
}