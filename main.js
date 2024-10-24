var aspectratio;
var gl;

var images = [];
var texture = [];
var resources = [];
var shadersstr = [];
var audio;

var inercialogo;
var guimaraeslogo;
var tet;
var mb;
var tunnel;
var renderer;
var cam;


function CreateTextures()
{
	for(var i = 0; i < 6; ++i)
	{
		texture[i] = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture[i]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, images[i]);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.generateMipmap(gl.TEXTURE_2D);
	}
	
	gl.bindTexture(gl.TEXTURE_2D, texture[3]);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	
	gl.bindTexture(gl.TEXTURE_2D, texture[4]);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	
	gl.bindTexture(gl.TEXTURE_2D, texture[5]);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}


function InitResources()
{
	inercialogo = new Model(resources[0]);
	guimaraeslogo = new Model(resources[1]);
}


window.requestAnimationFrame = (function()
{
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||

	function(callback, element)
	{
		window.setTimeout(callback, 1000 / 60);
	}
})();


function ChangeAspect()
{
	aspectratio = window.innerWidth / window.innerHeight;
}


function UpdateRes()
{
	document.getElementById('width').value = window.innerWidth;
	document.getElementById('height').value = window.innerHeight;
	
	ChangeAspect();
}


var t0 = mat4.create();
var t1 = mat4.create();
var t2 = mat4.create();


var bg_state = 'white';

function Loop()
{
	UpdateTime();

	if(currenttime < 8.0)
	{
		if (bg_state != 'black') {
			document.body.style.background = "#000";
			bg_state = 'black';
			//alert('black');
		}
		
		renderer.UseScreen();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		
		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[2]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[3]);
		
		mat4.identity(t0);
		mat4.translate(t0, [0.0, 0.0, -4 + Math.cos(currenttime*1.8)]);
		mat4.rotate(t0, currenttime, [0.0, 1.0, 0.0]);
		mat4.multiply(cam.mp, t0, t1);

		gl.useProgram(shader[5]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[5], "m"), false, t1);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[5], "nm"), false, t0);
		gl.uniform3fv(gl.getUniformLocation(shader[5], "s"), new Float32Array(inercialogo.scale));
		gl.uniform3fv(gl.getUniformLocation(shader[5], "b"), new Float32Array(inercialogo.bias));
		gl.uniform1i(gl.getUniformLocation(shader[5], "T"), 1);
		gl.uniform1f(gl.getUniformLocation(shader[5], "t"), 0.5 * currenttime);
		inercialogo.Draw();
	}
	else if(currenttime < 12.0)
	{ // guimaraes 
		if (bg_state != 'black') {
			document.body.style.background = "#000";
			bg_state = 'black';
			//alert('black');
		}
		renderer.UseScreen();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		
		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[2]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[3]);
		
		mat4.identity(t0);
		mat4.translate(t0, [0.0, 0.0, -4 + Math.cos(currenttime*1.8)]);
		mat4.rotate(t0, currenttime, [0.0, 1.0, 0.0]);
		mat4.multiply(cam.mp, t0, t1);

		gl.useProgram(shader[5]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[5], "m"), false, t1);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[5], "nm"), false, t0);
		gl.uniform3fv(gl.getUniformLocation(shader[5], "s"), new Float32Array(guimaraeslogo.scale));
		gl.uniform3fv(gl.getUniformLocation(shader[5], "b"), new Float32Array(guimaraeslogo.bias));
		gl.uniform1i(gl.getUniformLocation(shader[5], "T"), 1);
		gl.uniform1f(gl.getUniformLocation(shader[5], "t"), 0.5 * currenttime);
		guimaraeslogo.Draw();
	}
	else if(currenttime < 12.6)
	{
		renderer.UseScreen();
		gl.clearColor(1.0, 204.0/255.0, 204.0/255.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}
	else if(currenttime < 13.1)
	{
		renderer.UseScreen();
		gl.clearColor(153.0/255.0, 204.0/255.0, 204.0/255.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}
	else if(currenttime < 13.3)
	{
		renderer.UseScreen();
		gl.clearColor(1.0, 1.0, 204.0/255.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}
	else if(currenttime < 13.6)
	{
		renderer.UseScreen();
		gl.clearColor(102.0/255.0, 51.0/255.0, 0.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}
	else if(currenttime < 13.8)
	{
		renderer.UseScreen();
		gl.clearColor(1.0, 204.0/255.0, 204.0/255.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}
	else if(currenttime < 15.5)
	{ // tunnel
		if (bg_state == 'black') {
			document.body.style.background = "#fff";
			bg_state = 'l0';
		}
		
		renderer.UseFramebuffer();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[0]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[1]);

		gl.useProgram(shader[2]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[2], "mp"), false, cam.mp);
		gl.uniform1f(gl.getUniformLocation(shader[2], "len"), 100.0);
		gl.uniform2f(gl.getUniformLocation(shader[2], "q"), Math.sin(currenttime * 0.125) * 1.5, 2.0 * Math.cos(currenttime * 0.5));
		gl.uniform1f(gl.getUniformLocation(shader[2], "time"), 0.5 * currenttime);
		gl.uniform1i(gl.getUniformLocation(shader[2], "N"), 0);
		gl.uniform1i(gl.getUniformLocation(shader[2], "A"), 1);
		tunnel.Draw();
		
		gl.disable(gl.CULL_FACE);
		gl.disable(gl.DEPTH_TEST);
		
		renderer.UseScreen();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, renderer.Texture());

		gl.useProgram(shader[0]);
		gl.uniform1f(gl.getUniformLocation(shader[0], "T"), 0);
		Quad.Draw();
		
	}
	else if(currenttime < 22.0)
	{ // tunnel
		if (bg_state == 'l0') {
			document.body.style.background = "#fff";
			bg_state = 'l1';
			//alert('black');
			overlayelement.src = "2d/pt_scene_spirit_is_back.png";
			overlayelement.style.width = "100%";
			overlayelement.style.height = height+'px';
		}
		
		renderer.UseFramebuffer();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[0]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[1]);

		gl.useProgram(shader[2]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[2], "mp"), false, cam.mp);
		gl.uniform1f(gl.getUniformLocation(shader[2], "len"), 100.0);
		gl.uniform2f(gl.getUniformLocation(shader[2], "q"), Math.sin(currenttime * 0.125) * 1.5, 2.0 * Math.cos(currenttime * 0.5));
		gl.uniform1f(gl.getUniformLocation(shader[2], "time"), 0.5 * currenttime);
		gl.uniform1i(gl.getUniformLocation(shader[2], "N"), 0);
		gl.uniform1i(gl.getUniformLocation(shader[2], "A"), 1);
		tunnel.Draw();
		
		gl.disable(gl.CULL_FACE);
		gl.disable(gl.DEPTH_TEST);
		
		renderer.UseScreen();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, renderer.Texture());

		gl.useProgram(shader[0]);
		gl.uniform1f(gl.getUniformLocation(shader[0], "T"), 0);
		Quad.Draw();
		
	}
	else if(currenttime < 32.0)
	{ // tunnel again
		if (bg_state == 'l1') {
			document.body.style.background = "#fff";
			bg_state = 'l2';
			//alert('black');
			overlayelement.src = "2d/date.png";
			overlayelement.style.width = "100%";
			overlayelement.style.height = height+'px';
		}
		
		renderer.UseFramebuffer();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[0]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[1]);

		gl.useProgram(shader[2]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[2], "mp"), false, cam.mp);
		gl.uniform1f(gl.getUniformLocation(shader[2], "len"), 100.0);
		gl.uniform2f(gl.getUniformLocation(shader[2], "q"), Math.sin(currenttime * 0.125) * 1.5, 2.0 * Math.cos(currenttime * 0.5));
		gl.uniform1f(gl.getUniformLocation(shader[2], "time"), 0.5 * currenttime);
		gl.uniform1i(gl.getUniformLocation(shader[2], "N"), 0);
		gl.uniform1i(gl.getUniformLocation(shader[2], "A"), 1);
		tunnel.Draw();
		
		gl.disable(gl.CULL_FACE);
		gl.disable(gl.DEPTH_TEST);
		
		renderer.UseScreen();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, renderer.Texture());

		gl.useProgram(shader[0]);
		gl.uniform1f(gl.getUniformLocation(shader[0], "T"), 0);
		Quad.Draw();
		
	}
	else if(currenttime < 36.0)
	{ // tunnel again
		if (bg_state == 'l2') {
			document.body.style.background = "#fff";
			bg_state = 'l3';
			//alert('black');
			overlayelement.src = "2d/3_awesome_compos.png";
			overlayelement.style.width = "100%";
			overlayelement.style.height = height+'px';
		}
		
		renderer.UseFramebuffer();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[0]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[1]);

		gl.useProgram(shader[2]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[2], "mp"), false, cam.mp);
		gl.uniform1f(gl.getUniformLocation(shader[2], "len"), 100.0);
		gl.uniform2f(gl.getUniformLocation(shader[2], "q"), Math.sin(currenttime * 0.125) * 1.5, 2.0 * Math.cos(currenttime * 0.5));
		gl.uniform1f(gl.getUniformLocation(shader[2], "time"), 0.5 * currenttime);
		gl.uniform1i(gl.getUniformLocation(shader[2], "N"), 0);
		gl.uniform1i(gl.getUniformLocation(shader[2], "A"), 1);
		tunnel.Draw();
		
		gl.disable(gl.CULL_FACE);
		gl.disable(gl.DEPTH_TEST);
		
		renderer.UseScreen();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, renderer.Texture());

		gl.useProgram(shader[0]);
		gl.uniform1f(gl.getUniformLocation(shader[0], "T"), 0);
		Quad.Draw();
		
	}
	else if(currenttime < 40.0)
	{ // tunnel again
		if (bg_state == 'l3') {
			document.body.style.background = "#fff";
			bg_state = 'l4';
			//alert('black');
			overlayelement.src = "2d/combined_demo.png";
			overlayelement.style.width = "100%";
			overlayelement.style.height = "auto";
			overlayelement.style.margin = height*.25 +" 0 0 0";
		}
		
		renderer.UseFramebuffer();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[0]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[1]);

		gl.useProgram(shader[2]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[2], "mp"), false, cam.mp);
		gl.uniform1f(gl.getUniformLocation(shader[2], "len"), 100.0);
		gl.uniform2f(gl.getUniformLocation(shader[2], "q"), Math.sin(currenttime * 0.125) * 1.5, 2.0 * Math.cos(currenttime * 0.5));
		gl.uniform1f(gl.getUniformLocation(shader[2], "time"), 0.5 * currenttime);
		gl.uniform1i(gl.getUniformLocation(shader[2], "N"), 0);
		gl.uniform1i(gl.getUniformLocation(shader[2], "A"), 1);
		tunnel.Draw();
		
		gl.disable(gl.CULL_FACE);
		gl.disable(gl.DEPTH_TEST);
		
		renderer.UseScreen();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, renderer.Texture());

		gl.useProgram(shader[0]);
		gl.uniform1f(gl.getUniformLocation(shader[0], "T"), 0);
		Quad.Draw();
		
	}
	else if(currenttime < 42.0)
	{ // tunnel again
		if (bg_state == 'l4') {
			document.body.style.background = "#fff";
			bg_state = 'l5';
			//alert('black');
			overlayelement.src = "2d/graphics.png";
			overlayelement.style.width = "100%";
			overlayelement.style.height = "auto";
			overlayelement.style.margin = height*.25 +" 0 0 0";
		}
		
		renderer.UseFramebuffer();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[0]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[1]);

		gl.useProgram(shader[2]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[2], "mp"), false, cam.mp);
		gl.uniform1f(gl.getUniformLocation(shader[2], "len"), 100.0);
		gl.uniform2f(gl.getUniformLocation(shader[2], "q"), Math.sin(currenttime * 0.125) * 1.5, 2.0 * Math.cos(currenttime * 0.5));
		gl.uniform1f(gl.getUniformLocation(shader[2], "time"), 0.5 * currenttime);
		gl.uniform1i(gl.getUniformLocation(shader[2], "N"), 0);
		gl.uniform1i(gl.getUniformLocation(shader[2], "A"), 1);
		tunnel.Draw();
		
		gl.disable(gl.CULL_FACE);
		gl.disable(gl.DEPTH_TEST);
		
		renderer.UseScreen();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, renderer.Texture());

		gl.useProgram(shader[0]);
		gl.uniform1f(gl.getUniformLocation(shader[0], "T"), 0);
		Quad.Draw();
		
	}	
	else if(currenttime < 45.3)
	{ // tunnel again
		if (bg_state == 'l5') {
			document.body.style.background = "#fff";
			bg_state = 'l6';
			//alert('black');
			overlayelement.src = "2d/music.png";
			overlayelement.style.width = "100%";
			overlayelement.style.height = "auto";
			overlayelement.style.margin = "0 0 0 0";
		}
		
		renderer.UseFramebuffer();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[0]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[1]);

		gl.useProgram(shader[2]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[2], "mp"), false, cam.mp);
		gl.uniform1f(gl.getUniformLocation(shader[2], "len"), 100.0);
		gl.uniform2f(gl.getUniformLocation(shader[2], "q"), Math.sin(currenttime * 0.125) * 1.5, 2.0 * Math.cos(currenttime * 0.5));
		gl.uniform1f(gl.getUniformLocation(shader[2], "time"), 0.5 * currenttime);
		gl.uniform1i(gl.getUniformLocation(shader[2], "N"), 0);
		gl.uniform1i(gl.getUniformLocation(shader[2], "A"), 1);
		tunnel.Draw();
		
		gl.disable(gl.CULL_FACE);
		gl.disable(gl.DEPTH_TEST);
		
		renderer.UseScreen();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, renderer.Texture());

		gl.useProgram(shader[0]);
		gl.uniform1f(gl.getUniformLocation(shader[0], "T"), 0);
		Quad.Draw();
		
	}		
	else if(currenttime < 48)
	{ // tunnel again
		if (bg_state == 'l6') {
			document.body.style.background = "#fff";
			bg_state = 'l7';
			//alert('black');
			overlayelement.src = "2d/amazing_prizes.png";
			overlayelement.style.width = "auto";
			overlayelement.style.height = height;
			overlayelement.style.margin = "0 0 0 0";
		}
		
		renderer.UseFramebuffer();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[0]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[1]);

		gl.useProgram(shader[2]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[2], "mp"), false, cam.mp);
		gl.uniform1f(gl.getUniformLocation(shader[2], "len"), 100.0);
		gl.uniform2f(gl.getUniformLocation(shader[2], "q"), Math.sin(currenttime * 0.125) * 1.5, 2.0 * Math.cos(currenttime * 0.5));
		gl.uniform1f(gl.getUniformLocation(shader[2], "time"), 0.5 * currenttime);
		gl.uniform1i(gl.getUniformLocation(shader[2], "N"), 0);
		gl.uniform1i(gl.getUniformLocation(shader[2], "A"), 1);
		tunnel.Draw();
		
		gl.disable(gl.CULL_FACE);
		gl.disable(gl.DEPTH_TEST);
		
		renderer.UseScreen();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, renderer.Texture());

		gl.useProgram(shader[0]);
		gl.uniform1f(gl.getUniformLocation(shader[0], "T"), 0);
		Quad.Draw();
		
	}		
	else if(currenttime < 52.0)
	{ // tunnel again
		if (bg_state == 'l7') {
			document.body.style.background = "#fff";
			bg_state = 'l8';
			//alert('black');
			overlayelement.src = "2d/guimaraes.png";
			overlayelement.style.width = "auto";
			overlayelement.style.height = height*.85;
			overlayelement.style.margin = "0 0 0 0";
		}
		
		renderer.UseFramebuffer();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[0]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[1]);

		gl.useProgram(shader[2]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[2], "mp"), false, cam.mp);
		gl.uniform1f(gl.getUniformLocation(shader[2], "len"), 100.0);
		gl.uniform2f(gl.getUniformLocation(shader[2], "q"), Math.sin(currenttime * 0.125) * 1.5, 2.0 * Math.cos(currenttime * 0.5));
		gl.uniform1f(gl.getUniformLocation(shader[2], "time"), 0.5 * currenttime);
		gl.uniform1i(gl.getUniformLocation(shader[2], "N"), 0);
		gl.uniform1i(gl.getUniformLocation(shader[2], "A"), 1);
		tunnel.Draw();
		
		gl.disable(gl.CULL_FACE);
		gl.disable(gl.DEPTH_TEST);
		
		renderer.UseScreen();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, renderer.Texture());

		gl.useProgram(shader[0]);
		gl.uniform1f(gl.getUniformLocation(shader[0], "T"), 0);
		Quad.Draw();
		
	}		
	else if(currenttime < 56.0)
	{ // tunnel again
		if (bg_state == 'l8') {
			document.body.style.background = "#fff";
			bg_state = 'l9';
			//alert('black');
			overlayelement.src = "2d/features.png";
			overlayelement.style.width = "auto";
			overlayelement.style.height = height;
			overlayelement.style.margin = "0 0 0 0";
		}
		
		renderer.UseFramebuffer();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[0]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[1]);

		gl.useProgram(shader[2]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[2], "mp"), false, cam.mp);
		gl.uniform1f(gl.getUniformLocation(shader[2], "len"), 100.0);
		gl.uniform2f(gl.getUniformLocation(shader[2], "q"), Math.sin(currenttime * 0.125) * 1.5, 2.0 * Math.cos(currenttime * 0.5));
		gl.uniform1f(gl.getUniformLocation(shader[2], "time"), 0.5 * currenttime);
		gl.uniform1i(gl.getUniformLocation(shader[2], "N"), 0);
		gl.uniform1i(gl.getUniformLocation(shader[2], "A"), 1);
		tunnel.Draw();
		
		gl.disable(gl.CULL_FACE);
		gl.disable(gl.DEPTH_TEST);
		
		renderer.UseScreen();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, renderer.Texture());

		gl.useProgram(shader[0]);
		gl.uniform1f(gl.getUniformLocation(shader[0], "T"), 0);
		Quad.Draw();
		
	}		
	else if(currenttime < 60.0)
	{ // tunnel again
		if (bg_state == 'l9') {
			document.body.style.background = "#fff";
			bg_state = 'l10';
			//alert('black');
			overlayelement.src = "2d/free_entrance.png";
			overlayelement.style.width = "auto";
			overlayelement.style.height = height;
			overlayelement.style.margin = "0 0 0 0";
		}
		
		renderer.UseFramebuffer();
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[0]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[1]);

		gl.useProgram(shader[2]);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader[2], "mp"), false, cam.mp);
		gl.uniform1f(gl.getUniformLocation(shader[2], "len"), 100.0);
		gl.uniform2f(gl.getUniformLocation(shader[2], "q"), Math.sin(currenttime * 0.125) * 1.5, 2.0 * Math.cos(currenttime * 0.5));
		gl.uniform1f(gl.getUniformLocation(shader[2], "time"), 0.5 * currenttime);
		gl.uniform1i(gl.getUniformLocation(shader[2], "N"), 0);
		gl.uniform1i(gl.getUniformLocation(shader[2], "A"), 1);
		tunnel.Draw();
		
		gl.disable(gl.CULL_FACE);
		gl.disable(gl.DEPTH_TEST);
		
		renderer.UseScreen();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, renderer.Texture());

		gl.useProgram(shader[0]);
		gl.uniform1f(gl.getUniformLocation(shader[0], "T"), 0);
		Quad.Draw();
		
	} 
	else
	{ // red blue and grey stripes
		if (bg_state != 'black') {
			document.body.style.background = "#000";
			bg_state = 'black';
			overlayelement.src = "2d/id_logo.png";
			overlayelement.style.width = "316px";
			overlayelement.style.height = "525px";
			overlayelement.style.margin = "0 0 0 0";
		}
		renderer.UseScreen();
		
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT  | gl.COLOR_BUFFER_BIT);
		
		gl.activeTexture(gl.TEXTURE_0);
		gl.bindTexture(gl.TEXTURE_2D, texture[2]);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture[3]);
		
		gl.useProgram(shader[6]);
		
		gl.uniform2f(gl.getUniformLocation(shader[6], "s"), aspectratio, 1.0);
		
		if(OnBeat(16))
			gl.uniform2f(gl.getUniformLocation(shader[6], "b"), Math.random() * 20.0 - 10.0, Math.random() * 20.0 - 10.0);

		gl.uniform1i(gl.getUniformLocation(shader[6], "N"), 0);
		gl.uniform1i(gl.getUniformLocation(shader[6], "P"), 1);
		gl.uniform1f(gl.getUniformLocation(shader[6], "time"), 0.1 * currenttime);

		Quad.Draw();
	}

	requestAnimationFrame(Loop, gl.canvas);
}

var overlayelement;
var height;

function StartDemo()
{
	window.onresize = ChangeAspect;

	var width = parseInt(document.getElementById('width').value);
	height = parseInt(document.getElementById('height').value);
	
	if(isNaN(width) || width == 0)
		width = window.innerWidth;

	if(isNaN(height) || height == 0)
		height = window.innerHeight;

	var e = document.getElementById('settingsform');
	(e.parentNode).removeChild(e);
	var e = document.getElementById('demobutton');
	(e.parentNode).removeChild(e);

	//var div1 = document.createElement('div');
	//var div2 = document.createElement('div');

	var canvaselement = document.createElement('canvas');
	
	overlayelement = document.createElement('img');
	overlayelement.src = "";
	overlayelement.style.width = "100%";
	overlayelement.style.height = "auto";//height+'px';

	canvaselement.width = width;
	canvaselement.height = height;

	gl = canvaselement.getContext("webgl");
	if(!gl)
	{
		gl = canvaselement.getContext("experimental-webgl");
		if(!gl)
		{
			gl = canvaselement.getContext("webkit-3d");
			if(!gl)
			{
				gl = canvaselement.getContext("moz-webgl");
			}
		}
	}

    if(!gl)
		alert("Could not initialise WebGL");
	else
	{
		gl.alpha = false;
		gl.depth = false;
		gl.stencil = false;
		gl.antialias = false;
		gl.premultipliedAlpha = false;
		gl.preserveDrawingBuffer = true;

		if(!CompileShaders())
			alert("Shader error.");
		InitResources();

		Quad.Init();
		
		CreateTextures();

		renderer = new Renderer(width, height);

		tunnel = new Tunnel(32, 48, 0.1/100.0);
		mb = new MetaBalls(10);
		cam = new Camera();
		cam.AspectRatio(aspectratio);
		cam.FOVmm(35.0);
		cam.Range(0.1, 100.0);
		cam.UpdateProjection();

		/*document.body.appendChild(div1);
		div1.appendChild(canvaselement);
		
		document.body.appendChild(div2);
		div2.appendChild(overlayelement);*/
		
		document.body.appendChild(canvaselement);
		document.body.appendChild(overlayelement);
		
		
		document.body.background = "#000";

		InitTime();

		audio.play();

		Loop();
	}
}


function main()
{
	UpdateRes();
	LoadResources();
}


window.onresize = UpdateRes;
window.onload = main;