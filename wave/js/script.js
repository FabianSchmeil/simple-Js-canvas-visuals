window.onload = function() {	
	var canvas = document.querySelector('canvas');
	canvas.width =  window.innerWidth;
	canvas.height = window.innerHeight; 	
	var width_ = window.innerWidth;
	var height_ = window.innerHeight; 
	var c = canvas.getContext('2d');
	
	
	
	var cr = [];
	for(let i = 0; i<5000; i++){
		cr[i] = new ojt(height_);
	} 
	
	var x = 0;
	var render = function(){
		window.requestAnimationFrame(render);
		console.log("ee");
		c.clearRect(0, 0, window.innerWidth, window.innerHeight);	
		
		c.beginPath();
		c.fillStyle = "#00203d";
		c.rect(0, 0, window.innerWidth, window.innerHeight);
		c.fill();
		c.closePath();
			

		
		
		for(let i = 0; i < cr.length; i++){
			cr[i].move();
			cr[i].draw(c);
		}
		
			
	}
	render();

} 

class ojt {
	constructor(height_){
		this.x = -50;
		this.y = 0;
		this.e = (Math.random() * window.innerHeight) / 1.5;
		this.height_ = height_;
	}
	
	
	move(){	
		this.x = this.x + (Math.random() * 10) + 5; 
		this.y = 0.0007*(this.x * this.x) + this.e;
		
		if(this.y > this.height_){
			this.x = -50;
		} 
	}
	
	draw(c){
		c.beginPath();
        c.fillStyle = "#ffffff";
        c.rect(this.x, this.y, 3, 3);
        c.fill();
        c.closePath();
	} 
	
}

	
/* 	
	
	var cr = [];
	for(let i = 0; i<100; i++){
		cr[i] = new Circle(window.innerWidth / 2,window.innerHeight / 2);
		
	} 
	
	
	
	window.addEventListener('mousedown', function(e) {		
			
		cr[cr.length] = new Circle(e.x, e.y);
		
	});
	
	
	var render = function(){
		window.requestAnimationFrame(render);
		c.clearRect(0, 0, window.innerWidth, window.innerHeight);	
		for(let i = 0; i < cr.length; i++){
			cr[i].move();
			cr[i].draw(c);
		}
	}
	render();
	
}

class Circle {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	
	move(){
		this.x = this.x + (Math.random() * 30) - 15;
		this.y = this.y + (Math.random() * 30) - 15;	
	}
	
	draw(c){
		c.beginPath();
        c.fillStyle = "#000000";
        c.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        c.fill();
        c.closePath();
	} 
	
	
} 








 */






