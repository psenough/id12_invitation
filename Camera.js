function Camera()
{
	this.aspectratio = 1.0;
	this.fovx = 1.5707963267948966192313216916398;	//...
	this.fovy = 1.5707963267948966192313216916398;	//...
	this.fovd = 2.2214414690791831235079404950303;	//...
	this.near = 0.1;
	this.far = 100.0;

	this.mp = mat4.create();
	this.mv = mat4.create();
	this.mvp = mat4.create();

	this.arhtf = new Float32Array(2);
	this.boundingsphere = new Float32Array(4);


	this.AspectRatio = function(ar)
	{
		this.aspectratio = ar;
	};


	this.Range = function(n, f)
	{
		this.near = n;
		this.far = f;
	};


	this.FOVy = function(f)
	{
		this.fovy = f;
		this.fovx = this.fovy * aspectratio;
		this.fovd = Math.sqrt(this.fovy * this.fovy + this.fovx * this.fovx);
	};


	this.FOV = function(f)
	{
		this.fovd = f;
		this.fovy = Math.sqrt(this.fovd * this.fovd / (1.0 + this.aspectratio * this.aspectratio));
		this.fovx = this.fovy * aspectratio;
	};


	this.FOVmm = function(f)
	{
		this.fovd = 2.0 * Math.atan(18.0 / f);
		this.fovy = Math.sqrt(this.fovd * this.fovd / (1.0 + this.aspectratio * this.aspectratio));
		this.fovx = this.fovy * this.aspectratio;
	};


	this.UpdateProjection = function()
	{
		this.arhtf[0] = Math.tan(this.fovx * 0.5);
		this.arhtf[1] = Math.tan(this.fovy * 0.5);

		mat4.perspective(this.fovy * 57.295779513082320876798154814105, this.aspectratio, this.near, this.far, this.mp);
	};


	this.LookAt = function(position, center, up)
	{
		mat4.lookAt(position, center, up, this.mv);

		mat4.multiply(this.mp, this.mv, this.mvp);
	};


	this.UpdateBoundingSphere = function()
	{
		var t = Math.tan(this.fovd * 0.5);
		var spheredist =  0.5 * (t * t + 1.0) * (this.far + this.near);
		var sphereradius = Math.sqrt((this.far - spheredist) * (this.far - spheredist) + (this.far * t) * (this.far * t));

		boundingsphere[0] = 0.0;
		boundingsphere[1] = 0.0;
		boundingsphere[2] = -spheredist;
		boundingsphere[4] = sphereradius;
	};
}