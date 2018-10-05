let snake;
let rez = 1;
let food;
let w;
let h;
let spawntimer = 0;
let fps = 30;
let foodxsize = 20;
let foodysize = 20;
let isFoodSpecial = false;
let derandomizer = 0;

let unit;
var count;
var enemies = [];
let inputDelay = 0;


function setup() {
  createCanvas(800, 800);
  w = floor(width / rez);
  h = floor(height / rez);
  unit = floor(width / 2.0);
  frameRate(fps);
  snake = new Snake();
  spawnFood();

  // Create Array of Enemies
  noStroke();
  var wideCount = width / unit;
  var highCount = height / unit;
  console.log(wideCount);
  console.log(highCount);
  count = wideCount * highCount;
  // index for each enemy
  var index = 0;
  for (var mu = 0; mu < 2; mu++) {
    enemies[index++] = new Enemy();
  }
}

function spawnFood() {
  if(random(derandomizer, 20) > 17){
    isFoodSpecial = true;
    derandomizer = 0;
  } else{
    isFoodSpecial = false;
    derandomizer++;
  }
	foodLocation();
}

function foodLocation() {
  let x = (10/rez)*floor(random(1, w/(10/rez)));
  let y = (10/rez)*floor(random(1, h/(10/rez)));
  food = createVector(x, y);
}

function keyPressed() {
  if (inputDelay == 0) {
    inputDelay = 1;
    if (keyCode === LEFT_ARROW && snake.xdir != 10) {
      snake.setDir(-10, 0);
    } else if (keyCode === RIGHT_ARROW && snake.xdir != -10) {
      snake.setDir(10, 0);
    } else if (keyCode === DOWN_ARROW && snake.ydir != -10) {
      snake.setDir(0, 10);
    } else if (keyCode === UP_ARROW && snake.ydir != 10) {
      snake.setDir(0, -10);
    } else if (key == ' ') {
      snake.grow();
    }
  }
}

function draw() {
  scale(rez);
  background(220);
  
  // Snake
  if (snake.eat(food)) {
    spawnFood();
    enemies.push(new Enemy());
  }
  snake.update();
  snake.show();

  // Enemies
  enemies.forEach(enemy => {
    enemy.show();
    enemy.move();
    enemy.update();
  })

  // Food
  noStroke();
  if(isFoodSpecial){
  	fill("#0ebaba");
  } else {
  fill("#0eba0e");
  }
  rect(food.x, food.y, foodxsize, foodysize);
  text("food", food.x + 2, food.y, 50, 50);
  
  // update the input pause until next frame
  inputDelay = 0;
}


