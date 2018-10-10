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
var index = 0;
let delayInput = false;


// A HTML range slider
var slider;


function setup() {
  // Set up slider with range between 0 and 255 with starting value of 127
  slider = createSlider(0, 255, 127);
  
  createCanvas(800, 800);
  w = floor(width / rez);
  h = floor(height / rez);
  unit = floor(width / 2.0);
  frameRate(fps);
  
  resetSketch();

}

function resetSketch() {
  spawntimer = 0;
  isFoodSpecial = false;
  derandomizer = 0;
  enemies = [];
  index = 0;
  delayInput = false;
  snake = new Snake();
  spawnFood();
  for (var mu = 0; mu < 2; mu++) {
    enemies[index++] = new Enemy(index);
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
  if (!delayInput) {
    delayInput = true;
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
  background(slider.value());
  
  // Snake
  if (snake.eat(food)) {
    spawnFood();
    index++;
    enemies.push(new Enemy(index));
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
  text("food", food.x + 18, food.y+20, 50, 50);
  
  // update the input pause until next frame
  delayInput = false;
}
