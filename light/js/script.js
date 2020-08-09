window.onload = function() {	
	var canvas = document.querySelector('canvas');
	canvas.width =  window.innerWidth;
	canvas.height = window.innerHeight; 	
	var width_ = window.innerWidth;
	var height_ = window.innerHeight; 
	var c = canvas.getContext('2d');
	
	
	
	var mid = [width_/2, height_/2]
	var length_ = Math.sqrt(width_ + height_) * 2;
	var strokes = [
		 		 
		[mid[0] + length_*0.5, mid[1], mid[0] + length_, mid[1] + length_*0.5],
		[mid[0] + length_, mid[1] + length_*0.5, mid[0] + length_ *1.5, mid[1]],
		[mid[0] + length_ *1.5, mid[1], mid[0] + length_, mid[1] - length_*0.5], 
		[mid[0] + length_, mid[1] - length_*0.5, mid[0] + length_*0.5, mid[1]], 
		 
		
		[mid[0] - length_*0.5, mid[1], mid[0] - length_, mid[1] - length_*0.5],
		[mid[0] - length_, mid[1] - length_*0.5, mid[0] - length_*1.5, mid[1]],
		[mid[0] - length_*1.5, mid[1], mid[0] - length_, mid[1] + length_ * 0.5],
		[mid[0] - length_, mid[1] + length_ * 0.5, mid[0] - length_*0.5, mid[1]],
	
		
		[mid[0] + length_*0.5, mid[1] - length_*1.5, mid[0] + length_, mid[1] -length_],
		[mid[0] + length_, mid[1] -length_, mid[0] + length_*1.5, mid[1]-length_*1.5],
		[mid[0] + length_*1.5, mid[1]-length_*1.5, mid[0] + length_, mid[1]-length_*2],
		[mid[0] + length_, mid[1]-length_*2, mid[0] + length_*0.5, mid[1] - length_*1.5],
		
		[mid[0] - length_*0.5, mid[1]-length_*1.5, mid[0] - length_, mid[1] - length_],
		[mid[0] - length_, mid[1] - length_, mid[0] - length_*1.5, mid[1] - length_*1.5],
		[mid[0] - length_*1.5, mid[1] - length_*1.5, mid[0] - length_, mid[1] - length_*2],
		[mid[0] - length_, mid[1] - length_*2, mid[0] - length_*0.5, mid[1]-length_*1.5],
	
		
		[mid[0] + length_, mid[1] + length_, mid[0] + length_*1.5, mid[1] + length_*1.5],
		[mid[0] + length_*1.5, mid[1] + length_*1.5, mid[0] + length_, mid[1] + length_*2],
		[mid[0] + length_, mid[1] + length_*2, mid[0] + length_*0.5, mid[1] + length_*1.5],
		[mid[0] + length_*0.5, mid[1] + length_*1.5, mid[0] + length_, mid[1] + length_],
	
		[mid[0] - length_*0.5, mid[1] + length_ * 1.5, mid[0] - length_, mid[1] + length_ * 2],
		[mid[0] - length_, mid[1] + length_ * 2, mid[0] - length_ * 1.5, mid[1] + length_ * 1.5],
		[mid[0] - length_ * 1.5, mid[1] + length_ * 1.5, mid[0] - length_, mid[1] + length_],
		[mid[0] - length_, mid[1] + length_, mid[0] - length_*0.5, mid[1] + length_ * 1.5],
		
	
	
	
		[0 -20, 0 -20, width_ +20, 0-20],
		[width_ +20, 0-20, width_+20, height_+20],
		
		[width_+20, height_+20, 0-20, height_+20],
		[0-20, height_+20, 0-20, 0-20],
	 
	 
		
	];
	
	
	
	var rays = [];
		for(let i = 0; i < strokes.length * 3; i++){	
			rays[i] = new light(width_ / 2, height_ / 2);
		}
	var offrays = [];
		for(let i = 0; i < 8; i++){	
			let start = [];
			for(let j = 0; j < strokes.length * 3; j++){
				start[j] = new light(width_ / 2, height_ / 2);
			}
			offrays[i] = start;
		}
	
	
	
	
	
	
	
	var mangle = 0;
	var move = true;
	window.addEventListener('mousemove', function(e) {	
			for(let i = 0; i < rays.length; i++){
				rays[i].change(e.x, e.y)
			}		
			move = false;
		})
		
	window.addEventListener('touchstart', function(f) {	
			for(let i = 0; i < rays.length; i++){
				rays[i].change(f.pageX, f.pageY)
			}		
			move = false;
		})	
		
	
	window.addEventListener('touchmove', function(g) {	
			for(let i = 0; i < rays.length; i++){
				rays[i].change(g.pageX, g.pageY)
			}		
			move = false;
	}) 
	

	
	
	
	
	
	
	var az = Date.now();
	var render = function(){
		window.requestAnimationFrame(render);
		c.beginPath();
		c.fillStyle = "#000000";
		c.rect(0, 0, window.innerWidth, window.innerHeight);
		
		
		c.arc(mid[0], mid[1], 5, 0, 2 * Math.PI);
		c.fill();
		c.closePath();
		//drawlines(strokes, c);
		

		
	
		connect(rays, c, true);	
		for(let i = 0; i < strokes.length; i++){		
			for(let j=0; j<3; j++){	
				rays[3*i+j].set(strokes, i, j);
				rays[3*i+j].intersection(strokes);
				//rays[3*i+j].draw(c);
			}		
		}
			
			
		for(var p=0; p < offrays.length; p++){
			for(let i = 0; i < strokes.length; i++){		
				for(let j=0; j<3; j++){	
					offrays[p][3*i+j].set(strokes, i, j);
					offrays[p][3*i+j].intersection(strokes);
					//offrays[p][3*i+j].draw(c);
				}		
			}
			connect(offrays[p], c, false);
		}	
		
		for(let i=0; i < rays.length; i++){
			offrays[0][i].loc[0] = rays[0].loc[0] + 6; 
			offrays[0][i].loc[1] = rays[0].loc[1]; 
			
			offrays[1][i].loc[0] = rays[0].loc[0] - 6; 
			offrays[1][i].loc[1] = rays[0].loc[1]; 
			
			offrays[2][i].loc[0] = rays[0].loc[0]; 
			offrays[2][i].loc[1] = rays[0].loc[1] + 6; 
			
			offrays[3][i].loc[0] = rays[0].loc[0]; 
			offrays[3][i].loc[1] = rays[0].loc[1] - 6;
			
			offrays[4][i].loc[0] = rays[0].loc[0] + 5; 
			offrays[4][i].loc[1] = rays[0].loc[1] + 5;
			
			offrays[5][i].loc[0] = rays[0].loc[0] + 5; 
			offrays[5][i].loc[1] = rays[0].loc[1] - 5;
			
			offrays[6][i].loc[0] = rays[0].loc[0] - 5; 
			offrays[6][i].loc[1] = rays[0].loc[1] + 5;
			
			offrays[7][i].loc[0] = rays[0].loc[0] - 5; 
			offrays[7][i].loc[1] = rays[0].loc[1] - 5;
		}
		
		
		
		
		if(move){	
			var nz = Date.now();
		
		
			if(nz-az > 0){
				az = nz;
				mangle += 0.01;		
			}
			
			
			var x = Math.sin(mangle-Math.PI/2)* (length_*3.5);
			var y = Math.sqrt(Math.pow(length_*3.5, 2) - x*x);
			
			if(mangle >= Math.PI*2){mangle=0};
			if(mangle >= Math.PI){y=y*-1};
				
			for(var i = 0; i < rays.length; i++){
				rays[i].loc[0] = mid[0]-x;
				rays[i].loc[1] = mid[1]-y;			
			}			
			
		}
		
		
	}	
	render();
}




class light {
	constructor(x, y){
		this.loc = [x, y];
		this.dir = [0, 0];
		this.loce= [0, 0];
	}
	
	set(strokes, i, j){
		var offset = 0.00001;
		
		
		if(j == 0){		
			var dirx = strokes[i][0] - this.loc[0];
			var diry = strokes[i][1] - this.loc[1];		
			
		//turn right	
		}else if(j == 1){
			var dirx = (strokes[i][0] - this.loc[0]);
			var diry = (strokes[i][1] - this.loc[1]);
							
			if(dirx > 0 && diry >= 0){
				dirx += offset; 
				diry -= offset;
			}
			else if(dirx >= 0 && diry < 0){
				dirx -= offset; 
				diry -= offset;
			}
			else if(dirx < 0 && diry <= 0){
				dirx -= offset; 
				diry += offset;
			}
			else if(dirx <= 0 && diry > 0){
				dirx += offset; 
				diry += offset;
			} 
			
		//turn left	
		}else{
			var dirx = (strokes[i][0] - this.loc[0]);
			var diry = (strokes[i][1] - this.loc[1]);
			
			if(dirx > 0 && diry >= 0){
				dirx -= offset; 
				diry += offset;
			}
			else if(dirx >= 0 && diry < 0){
				dirx += offset; 
				diry += offset;
			}
			else if(dirx < 0 && diry <= 0){
				dirx += offset; 
				diry -= offset;
			}
			else if(dirx <= 0 && diry > 0){
				dirx -= offset; 
				diry -= offset;
			}  
		}
		this.dir = [dirx, diry];
	}
	
	
	draw(c){
		c.beginPath();
        c.fillStyle = "#2202D7";
        c.arc(this.loc[0], this.loc[1], 5, 0, 2 * Math.PI);
		c.arc(this.loce[0], this.loce[1], 5, 0, 2 * Math.PI);
		c.fill();
		c.closePath();
		
		c.beginPath();
		c.strokeStyle = "#000000";
		c.moveTo(this.loc[0], this.loc[1]);
		c.lineTo(this.loce[0], this.loce[1]);
		c.stroke();
        c.closePath();
	} 
	
	change(x, y){
		this.loc[0] = x;
		this.loc[1] = y;	
	}
	
	intersection(strokes){
		var distances = [];
		for(let i = 0; i < strokes.length; i++){
			let x1 = strokes[i][0];
			let y1 = strokes[i][1];
			let x2 = strokes[i][2];
			let y2 = strokes[i][3];
		
			let x3 = this.loc[0];
			let y3 = this.loc[1];
			let x4 = this.loc[0] + this.dir[0];
			let y4 = this.loc[1] + this.dir[1];
		
			let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
			if(den != 0){
				
				let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
				let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
		
				if (t >= 0 && t <= 1 && u > 0){		
					var intersecx = x1 + t * (x2 - x1);
					var intersecy = y1 + t * (y2 - y1);
					var dis = (this.loc[0] - intersecx) * (this.loc[0] - intersecx) + (this.loc[1] - intersecy) * (this.loc[1] - intersecy);
					
	
					distances.push([intersecx, intersecy, dis]);		
				}
			}
		}
		
		if(typeof distances[0] != 'undefined'){	
			let closest = 0;		
			for(let j = 0; j < distances.length; j++){
				if(distances[j][2] < distances[closest][2]){
					closest = j;
				}				
			}
			
			this.loce[0] = distances[closest][0];
			this.loce[1] = distances[closest][1];
		}else{	
			this.loce[0] = this.loc[0] + this.dir[0] * 200;
			this.loce[1] = this.loc[1] + this.dir[1] * 200;
		}
	}
}




function drawlines(strokes, c) {
	for(let i = 0; i < strokes.length; i++){
		let x1 = strokes[i][0];
		let y1 = strokes[i][1];
		let x2 = strokes[i][2];
		let y2 = strokes[i][3];
		c.strokeStyle = "#e20000";
		c.beginPath();
		c.moveTo(x1, y1);
		c.lineTo(x2, y2);
		c.stroke();
		c.closePath();
	}	
}








function connect(rays, c, op){
	var ids = [];
	for(var i = 0; i < rays.length; i++){	
		var angle = Math.atan(rays[i].dir[1] / rays[i].dir[0]) * (180/Math.PI);
			
		if(angle < 0){
			angle = angle + 180;
		}
		if(rays[i].dir[1] > 0){
			angle = angle + 180;
		}
		
		
		
		if(rays[i].dir[1] == 0 && rays[i].dir[0] > 0 && angle == 0){
			angle = 180;
		}

		ids[i] = angle;
	}
	
	var sorted = [];
	for(var i = 0; i < ids.length; i++){
		var smallest = 0;
		for(var j = 0; j < ids.length; j++){
			if(ids[j] < ids[smallest]){
				smallest = j;
			}			
		}
	
		sorted[i] = smallest;
		ids[smallest] = 500;
	}
	
	if(op){c.fillStyle = "rgba("+255+","+255+","+255+","+0.45+")";}
	else{c.fillStyle = "rgba("+255+","+255+","+255+","+0.2+")";}
	
	c.beginPath();
	c.moveTo(rays[sorted[0]].loce[0], rays[sorted[0]].loce[1]);
	for(var i = 1; i < rays.length; i++){
		c.lineTo(rays[sorted[i]].loce[0], rays[sorted[i]].loce[1]);
		
		
		if(i < rays.length - 1){
			c.lineTo(rays[sorted[i+1]].loce[0], rays[sorted[i+1]].loce[1]);
		}else{
			c.lineTo(rays[sorted[0]].loce[0], rays[sorted[0]].loce[1]);
		}
		
	}
		c.closePath();	
		c.fill();
}
