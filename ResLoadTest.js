function switchXHRState() {
  switch (this.readyState) {
    case 0: console.log("open() has not been called yet."); break;
    case 1: console.log("send() has not been called yet."); break;
    case 2: console.log("send() has been called, headers and status are available."); break;
    case 3: console.log("Downloading, responseText holds the partial data."); break;
    case 4: {
    	console.log("Complete!");
    	//this.callback.apply(this, this.arguments);
    	console.log(this.response);
    }
  }
};

function loadFile (sURL, fCallback /*, argumentToPass1, argumentToPass2, etc. */) {
  var oXHR = new XMLHttpRequest();
  //oXHR.callback = fCallback;
  oXHR.responseType = "arraybuffer";
  oXHR.arguments = Array.prototype.slice.call(arguments, 2);
  oXHR.onreadystatechange = switchXHRState;
  oXHR.open("GET", sURL, true);
  oXHR.send(null);
}

var uri = "http://localhost/~filipecruz/id12/";

var resourcesurl =
	[
		"3d/inercia.w3d",
		"3d/guimaraes.w3d"
	];

loadFile(uri+resourcesurl[0], done);
loadFile(uri+resourcesurl[1], done);


function done() {
	//alert('it is done!');
}