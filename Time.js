var BPM = 120;
var currentbeat, lastbeat, beattime;
var inittime, currenttime, dt;

function InitTime()
{
	//inittime = (new Date()).getTime();

	inittime = 0.0;
}

function UpdateTime()
{
	lastbeat = currentbeat;
	var lasttime = currenttime;

	//currenttime = ((new Date()).getTime() - inittime) / 1000.0;
	currenttime = audio.currentTime - inittime;
	currentbeat = Math.floor(currenttime / 60.0 * BPM);

	dt = currenttime - lasttime;
	document.title = 1.0 / dt + " fps";
	//document.title = currenttime;
	
	beattime = (currenttime - currentbeat / BPM * 60.0) / (60.0 / BPM);
}

function OnBeat(b, o)
{
	if(o == null)
		o = 0;
	
	if(b == null)
		b = 1;

	return (currentbeat - o) / b != (lastbeat - o) / b;
}

function RoundToBeat(t)
{
	return Math.round(t / 60.0 * BPM) / BPM * 60.0;
}