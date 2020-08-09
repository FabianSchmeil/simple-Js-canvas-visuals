window.onload = function() {	
	var canvas = document.querySelector('canvas');
	canvas.width =  window.innerWidth;
	canvas.height = window.innerHeight; 	
	var width_ = window.innerWidth;
	var height_ = window.innerHeight; 
	var c = canvas.getContext('2d');
 
	
	var tree = [];
	tree[0] = new branch(0,0,0,(height_+width_/2)/ 8);
	
	
	
	
	function line(p1, p2, p3, p4, l, i){	
		if(i > 2046){
			c.strokeStyle = "#840101";
		}else{
			c.strokeStyle = "#000000";
		}
	
		if(i < 500){
			c.beginPath();
			c.fillStyle = "#000000";
			c.arc(p3 + width_/2, -p4+height_, l / 20, 0, 2 * Math.PI);
			c.fill();
			c.closePath();
		}
		
		
		c.beginPath(); 
		c.lineWidth = l / 10;
		c.moveTo(p1 + width_/2, -p2+height_);
		c.lineTo(p3 + width_/2, -p4+height_);
		c.stroke(); 
		c.closePath();
		 
		
	}
	
	
	var ani = true;
	var grow = true;
	window.addEventListener('mousedown', function() {	
			if(tree.length > 10000 && grow){
				grow = false;
			}
			if(tree.length == 1 && grow == false){
				grow = true;
			}
			
	
			tree = attach(tree, grow);
			ani = false
		})
		
	window.addEventListener('touchstart', function(f) {	
			if(tree.length > 10000 && grow){
				grow = false;
			}
			if(tree.length == 1 && grow == false){
				grow = true;
			}
			
	
			tree = attach(tree, grow);
			ani = false
		})	
		
	
	
	

	
	var az = Date.now();
	var render = function(){
		var nz = Date.now();
		
		
		if(nz-az > 60 && ani == true){
			az = nz;
			
			if(tree.length > 10000 && grow){
				grow = false;
			}
			if(tree.length == 1 && grow == false){
				grow = true;
			}
			
	
			tree = attach(tree, grow);
		}
		
		
		window.requestAnimationFrame(render);
		c.beginPath();
		c.fillStyle = "#ffffff";
		c.rect(0, 0, window.innerWidth, window.innerHeight);
		c.fill();
		c.closePath();

		for(var i=0; i<tree.length;i++){
			tree[i].draw(line, i);
		}		
		
		
		
	}		
	render();		
}



class branch{
	constructor(p1, p2, p3, p4){
		this.start = [p1, p2];
		this.end = [p3, p4];
		this.vec = [p3 - p1, p4 - p2];
		//this.vec = [this.start[0] - this.end[0], this.start[1] - this.end[1]]
	}
	
	
	draw(line, i){
		line(this.start[0], this.start[1], this.end[0], this.end[1], Math.sqrt(this.vec[0]*this.vec[0]+this.vec[1]*this.vec[1]), i);
	}
	
	calc(){
		this.vec = [this.end[0] - this.start[0], this.end[1] - this.start[1]];
	}
	
}




function attach(tree , grow){
	if (grow == true){
		
		var l = tree.length;
		var apoints = (l-1+2)/2;
		
		
		
		for(var i = l-apoints; i < l; i++){
		//tree[i].calc();	
		
			
			let tvec = tree[i].vec;
		
		
			//console.log(tree[0].vec);
			var newvec = rotate(tvec, Math.PI*(Math.random()/10+0.8));
			//console.log(tree[0].vec);
		
			tree[i].calc();
			
		
			tree[tree.length] = new branch(tree[i].end[0],tree[i].end[1],
				tree[i].end[0] + newvec[0], tree[i].end[1] + newvec[1]);
	
		
		
			tree[i].calc();

	
	
			tvec = tree[i].vec;
			newvec = rotate(tvec, Math.PI*(Math.random()/10+1.1));	
			tree[tree.length] = new branch(tree[i].end[0],tree[i].end[1],
				tree[i].end[0] + newvec[0], tree[i].end[1] + newvec[1]);
			
			tree[i].calc();	
		}
		
	}else{
		var l = tree.length;	
		var apoints = (l-1+2)/2;
		
		//for(var i = l-apoints; i<l; i++){
		tree.splice(l-apoints);
		
		//}
		
		
	}
	
	
	return tree
}



 

function rotate(pdir, pangle){
	let dir = pdir;
	let angle = pangle;
	
	let pra = Math.atan(dir[1] / dir[0]);
	
	
	if(pra < 0){
		pra = pra + Math.PI;
	}
	if(dir[1] > 0){
		angle = angle + Math.PI;
	} 
	
	
	//console.log(pra*(180/Math.PI));
	

	var vex = Math.cos(angle+pra);
	var vey = Math.sin(angle+pra);
	
	
	var len = Math.sqrt(Math.pow(dir[0], 2) + Math.pow(dir[1], 2)) * (Math.random()/40+0.72) ;
	
	dir[0] = vex * len;
	dir[1] = vey * len;
	
	
	
	return dir;
}



 














