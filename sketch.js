// TO DO: 20181010

// TO DO: 20181009

// Debug task: Why are the enemies outputing 'unnamed' below 'enemy' in text?
// 		What should that be?
//

// Use 180 degree rotation matrix to choose where to spawn new enemies when the snake eats
//  this may requre adding parameters tto the enemy class

// Loading Menu Screen
// Implement Game Over etc
//score file
//grabbing nums from various game entities
//output score etc to top left 
//output # of enemies on top right

// Hi Scores?
//colors
let red = "#990000";
let ocean = "#009999"
let cyan = "#0ebaba";
let lime = "#0eba0e";
//end colors
let score;
let snake;
let rez = 1;
let food;
let w;
let h;
let spawntimer = 0;
let fps = 30;
let foodxsize = 20;
let foodysize = 20;
let isFoodSpecial = 0;
let derandomizer = 0;
let width = 800;
let height = 800;
let unit;
var count;
var enemies = [];
var index = 0;
let inputDelay = 0;
let end = false;
var survival = 0;
// an HTML range slider
var slider;
var sliderDifficulty;

var startingEnemyCount = 2;
var canvas;
var button;

function setup() {
  if(window.innerWidth > window.innerHeight)
  { canvas = createCanvas(window.innerHeight - 10, window.innerHeight - 10); } 
  else { canvas = createCanvas(window.innerWidth - 10, window.innerWidth - 10); }
  //createCanvas(width, height);
	score = new Score(snake);
  resetSketch();
  button = createButton('reset');
  button.mousePressed(resetSketch);
  // Set up slider with range between 0 and 255 with starting value of 127
  slider = createSlider(0, 255, 200);
  slider.position(25, 25);
  button.position(25, height - 25);
  button.size(width/10, height/20);
  setInterval(function(){survival++;}, 1000);
}

function resetSketch() {
  end = false;
  enemies = [];
  w = floor(width / rez);
  h = floor(height / rez);
  unit = floor(width / 2.0);
  frameRate(fps);
  snake = new Snake();
  
  spawnFood();
  index = 0;
  // button.position(25, height - 25);
  // Create Array of Enemies
  noStroke();
  // var wideCount = width / unit;
  // var highCount = height / unit;
  // count = wideCount * highCount;
  // index for each enemy
  
  for (var mu = 0; mu < startingEnemyCount; mu++) {
    enemies[index++] = new Enemy(index);
  }
  
  score.difficulty = 400;

}

function spawnFood() {
  if(random(derandomizer, 20) > 17){
    isFoodSpecial = 1;
    derandomizer = 0;
  } else{
    isFoodSpecial = 0;
    derandomizer++;
  }
	foodLocation(isFoodSpecial);
}

function foodLocation(isFoodSpecial) {
  let x = (10/rez)*floor(random(1, w/(10/rez)));
  let y = (10/rez)*floor(random(1, h/(10/rez)));
  food = createVector(x, y, isFoodSpecial);
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
    //} else if (key == ' ') {
      //resetSketch();
    }
    
  }
}

function draw() {
  textSize(20);
  if (end){
    button.show();
    button.size(width / 10, height / 20);
    button.position(width / 2, height / 2);
    background(slider.value());
    textAlign(floor(width / 2));
    textSize(150);
    text("Game Over", 10, 400);
    textSize(100)
    fill(red);
    text("Score: " + score.score, 10, 550);
    
    
    if (key == ' ') {
      end = false;
      resetSketch();
      // reset button position
      button.position(25, height - 25);
      button.hide();
    }
  }
  
  //regular draw
  else{
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
      if (snake.endGame(enemy)){
            end = true;
          }

    })

    // Food
    noStroke();
    if(isFoodSpecial){
      fill(cyan);
    } else {
    fill("#0eba0e");
    }
    rect(food.x, food.y, foodxsize, foodysize);
    text("food", food.x + 18, food.y + 20, 50, 50);

    // update the input pause until next frame
    inputDelay = 0;
    fill(0);
    textSize(40);
    //20181011 daniel 
    //score thing in top left  
    score.update();
    score.out();
  }
  
}

window.onresize = function() {
  if(window.innerWidth > window.innerHeight)
  { canvas.size(window.innerHeight - 10, window.innerHeight - 10); } 
  else { canvas.size(window.innerWidth - 10, window.innerWidth - 10); }
  width = window.innerWidth - 10;
  height = window.innerHeight - 10;
};


// Added Mouse Functionality
function mousePressed()
{
  if (inputDelay == 0) {
    inputDelay = 1;
    // Check if in upper right HALF of screen
    if (mouseY - (height / 2) > -(mouseX - (width / 2))){
      // Check if in the top triangle
      if (mouseY - (height / 2) > (mouseX - (width / 2)) && (snake.ydir != -10)){
      snake.setDir(0,10) // DOWN
      // Else must be in the right triangle
      } else if(snake.xdir != -10)
      {
      snake.setDir(10, 0) // RIGHT
      }
    } else
    { // Else it must be in the bottom left HALF of screen
      if (mouseY - (height / 2) < (mouseX - (width / 2)) && (snake.ydir != 10))
      {
      snake.setDir(0,-10) // UP
      } else if(snake.xdir != 10)
      {
      snake.setDir(-10, 0) // LEFT
      }
    }
  }
  button.position(25, height - 25);
  button.mousePressed(button.hide());
}
