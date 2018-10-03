let snake;
let rez = 10;
let food;
let w;
let h;
let spawntimer = 0;
let fps = 30;
let foodxsize = 2;
let foodysize = 2;

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
  foodLocation();

  // Create Array of Enemies
  noStroke();
  var wideCount = width / unit;
  var highCount = height / unit;
  console.log(wideCount);
  console.log(highCount);
  count = wideCount * highCount;
  // index for each enemy
  var index = 0;
  for (var mu = 0; mu < 15; mu++) {
    enemies[index++] = new Enemy();
  }
}

function foodLocation() {
  let x = floor(random(1, w));
  let y = floor(random(1, h));
  food = createVector(x, y);
}

function keyPressed() {
  if (inputDelay == 0) {
    inputDelay = 1;
    if (keyCode === LEFT_ARROW && snake.xdir != 1) {
      snake.setDir(-1, 0);
    } else if (keyCode === RIGHT_ARROW && snake.xdir != -1) {
      snake.setDir(1, 0);
    } else if (keyCode === DOWN_ARROW && snake.ydir != -1) {
      snake.setDir(0, 1);
    } else if (keyCode === UP_ARROW && snake.ydir != 1) {
      snake.setDir(0, -1);
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
    foodLocation();
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
  fill(65, 255, 200);
  rect(food.x, food.y, foodxsize, foodysize);
  text("food", food.x + 2, food.y, 50, 50);
  
  // update the input pause until next frame
  inputDelay = 0;
}



