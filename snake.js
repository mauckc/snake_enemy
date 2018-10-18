class Snake {
  
  constructor() {
  	this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
    this.headColor = color("#0e0eba");
    this.bodyColor = color("#0e0eba");
    this.hunger = 0;
    this.superTimer = 250;
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
    this.superTimer--;
    
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
    if(score.score % 5 == 4)
    {
      score.increaseDifficulty();
    }
  }
  
 
  
  endGame(enem) {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;

    let enemyxpos = enem.x;
    let enemyypos = enem.y;

    //if ( (enemyxpos - 10 < x && x < enemyxpos + 20) && (enemyypos - 10 < y && y < enemyypos+20) ) {
    //   return true;
    //}


    

    for(let i = 0; i <= this.body.length-1; i++) {
    	let part = this.body[i];
      if((enemyxpos - 10 < part.x && part.x < enemyxpos + 20) && (enemyypos - 10 < part.y && part.y < enemyypos + 20)) {
        //if super mode is on, then head (and only head) of snake will be able to kill enemy.
        if(this.superTimer > 0 && i == this.bodyLength - 1) {
          //send message to KILL enemy.
          
          return false;
        }
        else return true;
      }
    }
    return false;
  }
  
  eat(food) {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
  
    if((food.x <= x && x <= food.x + foodxsize) && (food.y <= y && y <= food.y + foodysize)) {
      if(food.z == 1){this.activateSuperMode()}
      this.grow();
      this.hunger = 0;
      return true;
    }
    // Snake gets hungrier everytime it tries to eat and fails
    if(this.superTimer <= 0){
    this.hunger++;
    }
    if (this.hunger>score.difficulty){
    end = true;
    }
    return false;
  }
  
  activateSuperMode() {
    this.superTimer = 250;
    this.headColor = color("#0ebaba");


  }

  show() {
    noStroke();
    fill(this.headColor);
    // Make text shake with merlin noise with amplitude directly related
    //  to the snake's hunger
    if(this.hunger < score.difficulty/2)
    {this.hungriness = noise(0);}
    else{this.hungriness = noise(this.hunger)*10}
    
    text("snake", this.body[0].x  + 18, this.body[0].y + 20, 50, 50);
    if(this.superTimer <= 0){
      this.headColor = color("#0e0eba");
      text(this.hunger, this.body[0].x + 20+this.hungriness, this.body[0].y - 20+this.hungriness, 50, 50);
    }
    else{text(this.superTimer, this.body[0].x + 20, this.body[0].y - 20, 50, 50);}

    rect(this.body[this.body.length - 1].x, this.body[this.body.length - 1].y, 10, 10);
    
    fill(this.bodyColor);
  	for(let i = 0; i < this.body.length - 1; i++) {
      rect(this.body[i].x, this.body[i].y, 10, 10);
    }
  }

}
