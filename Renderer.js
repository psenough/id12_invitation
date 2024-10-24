function Renderer(width, height)
{
	this.width = width;
	this.height = height;
	
	this.framebuffer = new Array(4);
	this.texture = new Array(4);

	this.depthrenderbuffer = gl.createRenderbuffer();
	gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthrenderbuffer);
	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);

	this.texture[0] = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.texture[0]);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	this.texture[1] = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.texture[1]);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width >> 1, this.height >> 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	this.texture[2] = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.texture[2]);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width >> 2, this.height >> 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	this.texture[3] = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.texture[3]);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width >> 2, this.height >> 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	this.framebuffer[0] = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer[0]);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture[0], 0);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthrenderbuffer);
	
	var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
	if(status != gl.FRAMEBUFFER_COMPLETE)
		alert("invalid shadow fbo status: " + status);

	this.framebuffer[1] = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer[1]);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture[1], 0);

	status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
	if(status != gl.FRAMEBUFFER_COMPLETE)
		alert("invalid shadow fbo status: " + status);
	
	this.framebuffer[2] = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer[2]);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture[2], 0);
	
	status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
	if(status != gl.FRAMEBUFFER_COMPLETE)
		alert("invalid shadow fbo status: " + status);

	this.framebuffer[3] = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer[3]);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture[3], 0);

	status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
	if(status != gl.FRAMEBUFFER_COMPLETE)
		alert("invalid shadow fbo status: " + status);

	gl.disable(gl.DITHER);
	gl.enableVertexAttribArray(0);


	this.Texture = function()
	{
		return this.texture[0];
	};
	
	
	this.GlowTexture = function()
	{
		return this.texture[2];
	};
	
	
	this.BeginDrawPass = function()
	{
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer[0]);
		gl.depthFunc(gl.EQUAL);
		gl.depthMask(gl.FALSE);
	};


	this.UseFramebuffer = function()
	{
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer[0]);
	};


	this.EndDrawPass = function()
	{
		gl.depthMask(gl.TRUE);
		gl.depthFunc(gl.LESS);
	};


	this.BeginEarlyZPass = function()
	{
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer[0]);
		gl.clear(gl.DEPTH_BUFFER_BIT);
		gl.colorMask(gl.FALSE, gl.FALSE, gl.FALSE, gl.FALSE);
		//gl.depthFunc(gl.LESS);
	};


	this.EndEarlyZPass = function()
	{
		gl.colorMask(gl.TRUE, gl.TRUE, gl.TRUE, gl.TRUE);
		//gl.depthFunc(gl.LESS);
	};


	this.UpdateGlow = function()
	{
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(GL.TEXTURE_2D, this.texture[0]);

		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer[1]);
		gl.useProgram(shader[0]);
		gl.uniform1f(gl.getUniformLocation(shader[0], "T"), 0);
		Quad.Draw();

		gl.bindTexture(GL.TEXTURE_2D, this.texture[1]);

		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer[2]);
		Quad.Draw();

		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer[3]);
		gl.useProgram(shader[3]);
		Quad.Draw();

		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer[2]);
		gl.useProgram(shader[4]);
		Quad.Draw();
	};
	

	this.UseScreen = function()
	{
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	};
};
