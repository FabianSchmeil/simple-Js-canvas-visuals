window.onload = function() {	
	var canvas = document.querySelector('canvas');
	canvas.width =  window.innerWidth;
	canvas.height = window.innerHeight; 	
	var width_ = window.innerWidth;
	var height_ = window.innerHeight; 
	var c = canvas.getContext('2d');
 

 	class Particle{
		constructor(){
			var ang = Math.random() *2*Math.PI;
			this.pos = [Math.random()*width_, Math.random()*height_];
			this.vel = [Math.sin(ang), Math.cos(ang)];
			this.acc = [0, 0];

		}

		update(){
			this.vel[0] += this.acc[0];
			this.vel[1] += this.acc[1];

			this.pos[0] += this.vel[0];
			this.pos[1] += this.vel[1];

			this.acc[0] = 0;
			this.acc[1] = 0;


			this.pos[0] = this.pos[0] < -scale ? (width_/scale+1)*scale : this.pos[0];
			this.pos[0] = this.pos[0] > (width_/scale+1)*scale ? -scale : this.pos[0];

			this.pos[1] = this.pos[1] < -scale ? (height_/scale+1)*scale : this.pos[1];
			this.pos[1] = this.pos[1] > (height_/scale+1)*scale ? -scale : this.pos[1];


			//this.vel[0] = this.vel[0] > 3 || this.vel[0] < -3 ? this.vel[0]/1.5 : this.vel[0];
			//this.vel[1] = this.vel[1] > 3 || this.vel[1] < -3 ? this.vel[1]/1.5 : this.vel[1];


			this.vel[0] = this.vel[0] > 1 ? 1 : this.vel[0];
			this.vel[0] = this.vel[0] < -1 ? -1 : this.vel[0];

			this.vel[1] = this.vel[1] > 1 ? 1 : this.vel[1];
			this.vel[1] = this.vel[1] < -1 ? -1 : this.vel[1];
		}

		applyForce(){
			this.acc[0] = vec[Math.round((this.pos[0]+scale)/scale)][Math.round((this.pos[1]+scale)/scale)][0] / 80;
			this.acc[1] = vec[Math.round((this.pos[0]+scale)/scale)][Math.round((this.pos[1]+scale)/scale)][1] / 80;
		}

		show(){
			c.beginPath();
			c.globalAlpha = 0.02;
			c.fillStyle = "#000000";
			c.arc(this.pos[0], this.pos[1], 1, 0, 2 * Math.PI);
			c.fill();
			c.closePath();

		}
	}

	
	//Methoden, die bei Events aufgerufen werden hier rein schreiben
	window.addEventListener('mousedown', function(e) {	
			var l = particles.length;

			for(var i=l; i<l+Math.sqrt(width_*width_+height_*height_); i++){
				particles[i] = new Particle();
				particles[i].pos[0] = e.x;
				particles[i].pos[1] = e.y;
			}

			/*
			c.beginPath();
			c.globalAlpha = 1;
			c.fillStyle = "#ffffff";
			c.rect(0, 0, window.innerWidth, window.innerHeight);
			c.fill();
			c.closePath();
			*/
		
		})
		
	window.addEventListener('touchstart', function(p) {	
			var l = particles.length;

			for(var i=l; i<l+Math.sqrt(width_*width_+height_*height_); i++){
				particles[i] = new Particle();
				particles[i].pos[0] = p.x;
				particles[i].pos[1] = p.y;
			}
		})	
		

	var particles = []; 
	var vec = [];
	var z = 0;
	var scale = 30;
	noise.seed(Math.random()*65536);
	
	for(var i=0; i<Math.sqrt(width_*width_+height_*height_); i++){
		particles[i] = new Particle();
	}
	

	c.beginPath();
	c.fillStyle = "#ffffff";
	c.rect(0, 0, window.innerWidth, window.innerHeight);
	c.fill();
	c.closePath();

	var render = function(){
		window.requestAnimationFrame(render);


		

		setvectors();
		//drawvectors();
		
		
		

		for(var i=0; i<particles.length; i++){
			particles[i].show();
			particles[i].update();
			particles[i].applyForce()
		}
		
	}		
	render();		




	function drawvectors(){
		c.beginPath();
		c.strokeStyle = "#000237";

		for(var i=0; i<vec.length; i++){
			for(var v=0; v<vec[i].length; v++){
				
				c.moveTo((i*scale), (v*scale));
				c.lineTo((i*scale)+(vec[i][v][0]*scale), (v*scale)+(vec[i][v][1]*scale));
			
				c.stroke(); 
			}
		}
	
		c.closePath()
	}



	function setvectors(){
		//set vectors 
		z += 0.000025;
		for(var i=0; i<width_/scale+4; i++){
			vec[i] = [];
			for(var v=0; v<height_/scale+4; v++){
				vec[i][v] = [];
				var ang = noise.perlin3(i/20, v/20, z)*Math.PI*4;

				vec[i][v][0] = Math.sin(ang); 
				vec[i][v][1] = Math.cos(ang); 
				//console.log(vec[i][v][0]);
			}
		}

	}


}