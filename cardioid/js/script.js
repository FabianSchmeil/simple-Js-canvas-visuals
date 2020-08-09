window.onload = function() {	
	var canvas = document.querySelector('canvas');
	canvas.width =  window.innerWidth;
	canvas.height = window.innerHeight; 	
	var width_ = window.innerWidth;
	var height_ = window.innerHeight; 
	var c = canvas.getContext('2d');



	if(width_<height_){
		var radius = width_/2 * 0.9; 
	}else{
		var radius = height_/2 * 0.9; 
	}

	var points = 2000;
	var factor = 1;
	
	function line(p1, p2, p3, p4){		
		c.beginPath(); 
		c.strokeStyle = "#ffffff";
		c.lineWidth = 0.5;
		c.moveTo(p1 + width_/2, p2+height_/2);
		c.lineTo(p3 + width_/2, p4+height_/2);
		c.stroke(); 
		c.closePath();
	
	}
	
	
	
	ani = true;
	window.addEventListener('mousemove', function(f) {	
			factor = f.x / width_ * 10 + 1;
			ani = false;
		})
		
	window.addEventListener('touchstart', function(f) {			
			factor = f.pageX / width_ * 10 + 1;			
			ani = false;
		})	
		
	
	window.addEventListener('touchmove', function(f) {			
			factor = f.pageX / width_ * 10 + 1;		
			ani = false;
	}) 
		
	
	
	

	
	var az = Date.now();
	var render = function(){
		var nz = Date.now();

		if(nz-az > 10 && ani){
			az = nz;
			factor += 0.01;
		}

		window.requestAnimationFrame(render);
		c.beginPath();
		c.fillStyle = "#000000";
		c.rect(0, 0, window.innerWidth, window.innerHeight);
		c.fill();
		c.closePath();

		
		c.beginPath();
		c.arc(width_/2, height_/2, radius, 0, 2 * Math.PI);
		c.strokeStyle = "#ffffff";
		c.lineWidth = 2;
		c.stroke();
		c.closePath();
		

		
		
		var distance = (Math.PI*2) / points;
		for(var i = 0; i<points; i++){

			var aangle = ((Math.PI*2) / points) * i;
			var ax = radius * Math.cos(aangle);
			var ay = radius * Math.sin(aangle);

			//console.log(Math.TWO_PI);


			/*	
			c.beginPath();
			c.fillStyle = "#ffffff";
			c.arc(ax+width_/2, ay+height_/2, 2, 0, 2 * Math.PI);
			c.fill();
			c.closePath();
			*/


			var bangle = ((Math.PI*2) / points) * (i * factor);
			var bx = radius * Math.cos(bangle);
			var by = radius * Math.sin(bangle);


			line(ax, ay, bx, by);



		}

		
		
	}		
	render();		
}



