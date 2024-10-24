var filesloaded, totalfiles, button;


function OnLoad()
{
	console.log('updating OnLoad...');
	++filesloaded;
	button.textContent = 'Loading ' + filesloaded / (totalfiles) * 100.0 + '%';

	if(filesloaded == totalfiles)
		LoadingDone();
}


function LoadResources()
{
	var imagesurl =
	[
		"2d/6903-normal.jpg",
		"2d/6903-diffuse.jpg",
		"2d/noise.png",
		"2d/pal.png",
		"2d/pt_scene_spirit_is_back.png",	//4
		"2d/2012_demoparty.png"			//5
	];

	var shadersurl =
	[
		"glsl/texture.vs",		//0
		"glsl/texture.fs",		//1
		"glsl/mt.vs",			//2
		"glsl/mb.fs",			//3
		"glsl/tunnel.vs",		//4
		"glsl/tunnel.fs",		//5
		"glsl/glowh.fs",		//6
		"glsl/glowv.fs",		//7
		"glsl/0.vs",			//8
		"glsl/0.fs",			//9
		"glsl/tunnelref.fs",	//10
		"glsl/2d.vs",			//11
		"glsl/jap.fs"			//12
	];

	var resourcesurl =
	[
		"3d/inercia.w3d",
		"3d/guimaraes.w3d"
		//"3d/cub.w3d",
		//"3d/k7.w3d"
	];
	
	filesloaded = 0;
	totalfiles = imagesurl.length + resourcesurl.length + shadersurl.length + 1;
	button = document.getElementById('demobutton');
	button.textContent = 'Loading 0%';

	audio = new Audio();
	audio.addEventListener('canplaythrough', OnLoad, false);
	audio.src = 'music/jeenio-funky_strings-mix1.ogg';
	//audio.volume = 0.0;

	LoadImages(imagesurl);
	LoadBinary(resourcesurl);
	LoadShaders(shadersurl);
}

var uri = "";//"http://localhost/~filipecruz/id12/";

function LoadImages(imagesurl)
{
	for(var i = 0; i < imagesurl.length;  ++i)
	{
		images[i] = new Image();
		images[i].onload = OnLoad;
		images[i].src = imagesurl[i];
	}
}


function LoadBinary(resourcesurl)
{
	for(var i = 0; i < resourcesurl.length;  ++i)
	{
		var xhr = new XMLHttpRequest();
		xhr.responseType = "arraybuffer";
		xhr.thisid = i;
		xhr.onreadystatechange = function(){
			  switch (this.readyState) {
				case 0: console.log("open() has not been called yet."); break;
				case 1: console.log("send() has not been called yet."); break;
				case 2: console.log("send() has been called, headers and status are available."); break;
				case 3: console.log("Downloading, responseText holds the partial data."); break;
				case 4: {
					console.log("Complete! "+this.thisid);
					resources[this.thisid] = this.response;
					OnLoad();
				}
			  }
			}
		xhr.open("GET", uri+resourcesurl[i], true); 
		xhr.send(null);
	}
}


function LoadShaders(shadersurl)
{
	for(var i = 0; i < shadersurl.length;  ++i)
	{	
		var xhr = new XMLHttpRequest();
		xhr.thisid = i;
		xhr.onreadystatechange = function(){
			  switch (this.readyState) {
				case 0: console.log("open() has not been called yet."); break;
				case 1: console.log("send() has not been called yet."); break;
				case 2: console.log("send() has been called, headers and status are available."); break;
				case 3: console.log("Downloading, responseText holds the partial data."); break;
				case 4: {
					console.log("Complete! "+this.thisid);
					shadersstr[this.thisid] = this.responseText;
					OnLoad();
				}
			  }
			}
		xhr.open("GET", uri+shadersurl[i], true);  
		xhr.send(null);
	}
}


function LoadingDone()
{
	var button = document.getElementById('demobutton');
	button.textContent = 'Click to start!';
	button.style.color = '#fff';
	button.style.cursor = 'pointer';

	button.onclick = StartDemo;
}