let snake;
let enemy;
let rez = 10;
let food;
let w;
let h;
let spawntimer = 0;
let fps = 20;

function setup() {
  createCanvas(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(fps);
  snake = new Snake();
  enemy = new Enemy();
  foodLocation();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
  
}

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
  	snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
  	snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
  	snake.setDir(0, -1);
  } else if (key == ' ') {
  	snake.grow();
  }

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function draw() {
  scale(rez);
  background(220);
  if (snake.eat(food)) {
     foodLocation();
  }
  snake.update();
  snake.show();
  enemy.update();
  enemy.show();
//   if (spawntimer % 20) {
  
//   }
//   spawntimer += 1;
  

  
  noStroke();
  fill(65, 255, 200);
  rect(food.x, food.y, 1, 1);
  if (snake.endGame()) {
    background(255, 0, 0);
  	print("END GAME");
    sleep(500);
    //noLoop();
    prompt(text, "Restart?")
    if (keyCode == 'Restart?'){
      background(220);
      loop();
    }
  }

}
