class Enemy {

	constructor(){
		this.body = [];
    this.body[0] = createVector(30, 30);
    this.xdir = 0;
    this.ydir = 0;
    this.timer = 0;
    this.diff = floor((w+h)/2);
	}
  
  setDir(x,y) {
    this.xdir = x;
    this.ydir = y;
  }
  
  chase() {
    if (abs(this.xDiff) > abs(this.yDiff)) {
    	if (this.xDiff >= 0 ) { this.setDir(-1,0)}
      else ( this.setDir(1,0))
    }else { 
      if (this.yDiff >= 0 ) { this.setDir(0,-1)}
      else ( this.setDir(0,1))
    }
  }
  
  update() {
    if (snake.xdir != 0 || snake.ydir != 0){
      this.xDiff = this.body[0].x - snake.body[0].x;
      this.yDiff = this.body[0].y - snake.body[0].y;
      //this.dist = floor((abs(this.xDiff) + abs(this.yDiff))/2)
      this.dist = floor(sqrt( pow(this.xDiff,2) + pow(this.yDiff,2) ) )

      this.body[0].x += this.xdir;
      this.body[0].y += this.ydir;
      this.timer++;
      if (this.timer > this.dist){
        this.chase();
        this.timer = 0;
      }
    }
  }
  
  show() {
    fill(255,0,0);
    rect(this.body[0].x, this.body[0].y, 2, 2);
  }
}