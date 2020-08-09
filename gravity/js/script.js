window.onload = function() {	
	var canvas = document.querySelector('canvas');
	canvas.width =  window.innerWidth;
	canvas.height = window.innerHeight; 	
	var width_ = window.innerWidth;
	var height_ = window.innerHeight; 
	var c = canvas.getContext('2d');
	
	
	
	var objects = [];
	for(var i = 0; i < 20; i++){
		objects[i] = new ball(Math.random() * (width_ - 50) + 25, Math.random() * (height_ - 50) + 25);
	}
	
	
	window.addEventListener('mousedown', function() {	
			for(var i = 0; i < objects.length; i++)
				objects[i].acc();
		})
	window.addEventListener('touchstart', function() {	
			for(var i = 0; i < objects.length; i++)
				objects[i].acc();
		})	
		
	
	var render = function(){
		window.requestAnimationFrame(render);
		c.clearRect(0, 0, width_, height_);	
		
		for(let i = 0; i < objects.length; i++){
			objects[i].draw(c);
			objects[i].update();
			objects = collison(objects, i);
			objects[i].move();
		}
				
	}
	render();

} 

class ball {	
	constructor(x, y){
		this.width_ = window.innerWidth;
		this.height_ = window.innerHeight - 5; 
		this.loc = [x, y];
		this.vel = [0, 0];		
		this.ballwidth = (this.width_ * this.height_) / 100000; 
		this.mass = 2;
		
	}
	
	update(){
		// Luftwiderstand
		this.vel[0] = this.vel[0] * 0.997;
		this.vel[1] = this.vel[1] * 0.997;	
		
		
		if(this.loc[1] < this.height_ - this.ballwidth){	
			this.vel[1] += 0.12; 
		}
		
		
		var bx = this.width_ - this.ballwidth;
		var by = this.height_ - this.ballwidth;
		
		 
		if(this.loc[1] > by){			
			this.vel[1] = (this.vel[1] * - 0.7);
			this.loc[1] = by;
			//this.vel[0] = (this.vel[0] *  0.95);
		}
		if(this.loc[1] < this.ballwidth){			
			this.vel[1] = (this.vel[1] * - 0.7);
			this.loc[1] = this.ballwidth;
			//this.vel[0] = (this.vel[0] *  0.95);
		}
		
		if(this.loc[0] > bx){
			this.vel[0] = (this.vel[0] * - 0.7);	
			this.loc[0] = bx;
			//this.vel[1] = (this.vel[1] *  0.95);
		}
		if(this.loc[0] < this.ballwidth){
			this.vel[0] = (this.vel[0] * - 0.7);	
			this.loc[0] = this.ballwidth;
			//this.vel[1] = (this.vel[1] *  0.95);
		}			
		  
		
		
		
		
		
	}
	
	
	acc(){
		this.vel[1] -= Math.random() * 20 + 20;
		this.vel[0] += Math.random() * 40 - 20;
		//this.vel[0] += 0.5;
	}
	
	move(){	
		this.loc[0] += this.vel[0];
		this.loc[1] += this.vel[1];
	}
	
	draw(c){
		c.beginPath();
        c.fillStyle = "#FFFFFF";
        c.arc(this.loc[0], this.loc[1], this.ballwidth, 0, 2 * Math.PI);
        c.fill();
        c.closePath();
	} 
	
}


function collison(objects, i){
	for(let j = i+1; j < objects.length; j++){
			if((Math.pow(objects[j].loc[0] - objects[i].loc[0],2) + Math.pow(objects[j].loc[1] - objects[i].loc[1],2)) < Math.pow(objects[0].ballwidth * 2, 2) && (i != j)){

				
				var Distance = Math.sqrt(Math.pow(objects[j].loc[0] - objects[i].loc[0],2) + Math.pow(objects[j].loc[1] - objects[i].loc[1],2));
				var Overlap = 0.5 * (Distance - objects[0].ballwidth * 2);
				
				//normal vectors
				var nx = (objects[j].loc[0] - objects[i].loc[0]) / Distance;
				var ny = (objects[j].loc[1] - objects[i].loc[1]) / Distance;
				
				objects[j].loc[0] -= Overlap * nx;
				objects[j].loc[0] -= Overlap * ny;
				
				objects[i].loc[0] += Overlap * nx;
				objects[i].loc[1] += Overlap * ny;
				
				//tangent vector
				var tx = -ny;
				var ty = nx;
				
				//dot product tangent
				var dpTan1 = objects[i].vel[0] * tx + objects[i].vel[1] * ty;
				var dpTan2 = objects[j].vel[0] * tx + objects[j].vel[1] * ty;
				
				//dot product normal
				var dpNorm1 = objects[i].vel[0] * nx + objects[i].vel[1] * ny;
				var dpNorm2 = objects[j].vel[0] * nx + objects[j].vel[1] * ny;
				
				//conservation of momentum in 1D
				var m1 = (dpNorm1 * (objects[i].mass - objects[j].mass) + 2 * objects[j].mass * dpNorm2) / (objects[i].mass + objects[j].mass);
				var m2 = (dpNorm2 * (objects[j].mass - objects[i].mass) + 2 * objects[i].mass * dpNorm1) / (objects[i].mass + objects[j].mass);
				
				objects[i].vel[0] = tx * dpTan1 + nx * m1;
				objects[i].vel[1] = ty * dpTan1 + ny * m1;  
				
				objects[j].vel[0] = tx * dpTan2 + nx * m2;
				objects[j].vel[1] = ty * dpTan2 + ny * m2;
				
				
				//console.log("1");
		}
	}	
	return objects
}
