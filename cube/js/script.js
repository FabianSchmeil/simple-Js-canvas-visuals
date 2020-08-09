window.onload = function() {	
	var canvas = document.querySelector('canvas');
	canvas.width =  window.innerWidth;
	canvas.height = window.innerHeight; 	
	var width_ = window.innerWidth;
	var height_ = window.innerHeight; 
	var c = canvas.getContext('2d');
	
	
	
	var cube = [];
		cube[0] = new point(-100, -100, -100);
		cube[1] = new point(+100, -100, -100);
		cube[2] = new point(+100, +100, -100);
		cube[3] = new point(-100, +100, -100);

		cube[4] = new point(-100, -100, +100);
		cube[5] = new point(+100, -100, +100);
		cube[6] = new point(+100, +100, +100);
		cube[7] = new point(-100, +100, +100);
	
	
	
	window.addEventListener('mousedown', function() {	
			speed += 0.01;
		})
		
	window.addEventListener('touchstart', function() {	
			speed += 0.01;
		})	
		
	var speed = 0.02;
	var angle = 1;
	var render = function(){
		window.requestAnimationFrame(render);
		c.clearRect(0, 0, width_, height_);	
		
		
	
		speed = speed * 0.99;
		if(speed < 0.0001){
			speed = 0;
		}
		
		
		angle += speed;
		
		for(let i = 0; i < cube.length; i++){		
			cube[i].rotationX(angle);
			cube[i].rotationY(angle);
			cube[i].rotationZ(angle);
			cube[i].projection();		
		}
		
		
		for(let j = 0; j != 4; j++){
				c.beginPath();
				c.strokeStyle = "#FFFFFF";
				let xdis = window.innerWidth / 2;
				let ydis = (window.innerHeight - 5) / 2;
				
				c.moveTo(cube[j].drawloc[0] + xdis, cube[j].drawloc[1] + ydis);		             //drawline(j, (j+1) % 4)
				c.lineTo(cube[(j+1) % 4].drawloc[0] + xdis, cube[(j+1) % 4].drawloc[1] + ydis);
				
				c.moveTo(cube[j+4].drawloc[0] + xdis, cube[j + 4].drawloc[1] + ydis);             //drawline(j + 4, ((j + 1) % 4) + 4)
				c.lineTo(cube[((j + 1) % 4) + 4].drawloc[0] + xdis, cube[((j + 1) % 4) + 4].drawloc[1] + ydis);
				
				c.moveTo(cube[j+4].drawloc[0] + xdis, cube[j + 4].drawloc[1] + ydis);		       //drawline(j + 4, (j + 4) % 4)
				c.lineTo(cube[(j + 4) % 4].drawloc[0] + xdis, cube[(j + 4) % 4].drawloc[1] + ydis); 
				
				c.stroke();   
				c.closePath();
			}				
	}
	render();

} 


function matmul(mtrx, kord){
        var x = (mtrx[0][0] * kord[0]) + (mtrx[0][1] * kord[1]) + (mtrx[0][2] * kord[2]);
        var y = (mtrx[1][0] * kord[0]) + (mtrx[1][1] * kord[1]) + (mtrx[1][2] * kord[2]);
        var z = (mtrx[2][0] * kord[0]) + (mtrx[2][1] * kord[1]) + (mtrx[2][2] * kord[2]);
        newpoint = [x, y, z];
    return newpoint
}
	
	
	
class point {	
	constructor(x, y, z){
		this.loc = [x, y, z];
		this.drawloc = [x, y, z];
		if(window.innerHeight < window.innerWidth){
			this.dis = window.innerHeight / 500; 
		}else{
			this.dis = window.innerWidth / 500; 
		}
	}
	
	
	projection(){
		var projectionmtrx = [
			[1*this.dis, 0, 0],
			[0, 1*this.dis, 0],
			[0, 0,          0],
		]
		this.drawloc = matmul(projectionmtrx, this.drawloc);
	}
	
	
	rotationX(angle){
    var rotation = [
			[1, 0, 0],
			[0, Math.cos(angle), -Math.sin(angle)],
			[0, Math.sin(angle), Math.cos(angle)],
		]
		this.drawloc = matmul(rotation, this.loc);
	}
	
	rotationY(angle){
		var rotation = [
			[Math.cos(angle), 0, Math.sin(angle)],
			[0, 1, 0],
			[-Math.sin(angle), 0, Math.cos(angle)],
		]
		this.drawloc = matmul(rotation, this.drawloc);
	}
	 
	rotationZ(angle){
     var rotation = [
			[Math.cos(angle), -Math.sin(angle), 0],
			[Math.sin(angle),  Math.cos(angle), 0],
			[0, 0, 1],
		]
		this.drawloc = matmul(rotation, this.drawloc);
	}

}

	
