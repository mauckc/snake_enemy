class Score{

  constructor(snake){
    this.score = 0;
    this.hiscore = 0;
    this.difficulty = 400;
  }
  
  update(){
    if (snake.body.length - 1 > 0){
    this.score = snake.body.length - 1;
    }
    else{this.score = 0}

    if (this.score > this.hiscore){
      this.hiscore = this.score
    }
  }
  
  increaseDifficulty(){
  	this.difficulty = this.difficulty * 0.75;  
  }
  
  out(){
		return text("Score: " + this.score, width - 255, 40), text("Highscore: " + this.hiscore, width - 255, 80)
  }
}