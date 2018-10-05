class Snake {
  
  constructor() {
  	this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
    this.color = color("#0e0eba");
    this.hunger = 0;
  }
  
  setDir(x, y) {
  	this.xdir = x;
    this.ydir = y;
  }
  
  update() {    
  	let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
    
    // Periodic Boundary Conditions
    if (head.x>=w)
    {
      head.x-=w
    }
    if (head.y>=h)
    {
      head.y-=h
    }
     if (head.x<=-2)
    {
      head.x+=w
    }
    if (head.y<=-2) 
    {
      head.y+=h
    }
  }
  
  grow() {
  	let head = this.body[this.body.length-1].copy();
    this.len++;
    this.body.push(head);
  }
  
  endGame() {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    // Remove Boundaries
    // if(x > w-1 || x < 0 || y > h-1 || y < 0) {
    //    return true;
    // }
    let enemyxpos = enemy.body[enemy.body.length-1].x;
    let enemyypos = enemy.body[enemy.body.length-1].y;
    // if ( (x == enemyxpos ) && (y == enemyypos ) ) {
    //    return true;
    // }
    // 2 by 2 enemy danger area
    if ( (x == enemyxpos || x == enemyxpos + 1) && (y == enemyypos || y == enemyypos+1) ) {
       return true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
    	let part = this.body[i];
      if(part.x == x && part.y == y) {
      	return true;
      }
    }
    return false;
  }
  
  eat(pos) {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    
    if((pos.x <= x && x < pos.x + foodxsize) && (pos.y <= y && y < pos.y + foodysize)) {
      this.grow();
      this.hunger = 0;
      return true;
    }
    // Snake gets hungrier everytime it tries to eat and fails
    this.hunger++;
    return false;
  }
  
  show() {
    noStroke();
    fill(this.color);
    // Make text shake with merlin noise with amplitude directly related
    //  to the snake's hunger
    text("snake", this.body[0].x , this.body[0].y, 12, 12);
    text(this.hunger, this.body[0].x, this.body[0].y - 20, 12, 12);
  	for(let i = 0; i < this.body.length; i++) {
      rect(this.body[i].x, this.body[i].y, 10, 10);
    }
  }

}
