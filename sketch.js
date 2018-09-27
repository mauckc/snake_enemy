let snake;
//let enemy;
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
  //console.log(unit);
  frameRate(fps);
  snake = new Snake();
  //enemy = new Enemy();
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
  // iterate over y units
  //for (var y = 0; y < highCount; y++) {
  // iterate over x units
  //for (var x = 0; x < wideCount; x++) {
  // Create each enemy
  // enemies[index++] = new Enemy(x, y, random(1.0, 2.0), random(1.0,2.0), 255);
  for (var mu = 0; mu < 10; mu++){
  	enemies[index++] = new Enemy();
  }
  //}
  //}
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
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  for (var i = 0; i < 10; i++) {
    enemies[i].update();
    enemies[i].draw();
  }

  inputDelay = 0;

  noStroke();
  fill(65, 255, 200);
  rect(food.x, food.y, foodxsize, foodysize);
  text("food", food.x + 10, food.y, 50, 50);
}

// function Enemy( _x, _y, _xspeed, _yspeed, _color) {
//   this.x = _x;
//   this.y = _y;
//   this.xspeed = _xspeed;
//   this.yspeed = _yspeed;
//   this.color = _color;
//   this.xDir = 1;
//   this.yDir = 1;
// }

// Enemy.prototype.setDir = function(x, y) {
//   // Change the x and y directions
//   this.xDir = x;
//   this.yDir = y;
// }


function Enemy() {
  this.x = floor(random(1, w));
  this.y = floor(random(1, h));
  //console.log(this.x)
  this.xspeed = 1;
  this.yspeed = 1;
  this.color = 255;
  this.xDir = 1;
  this.yDir = 1;
}

// Custom method for updating the variables
Enemy.prototype.update = function() {
  // Update the x direction
  this.x = floor(this.x + (this.speed * this.xDir));
  this.y = floor(this.y + (this.speed * this.yDir));

  // Boundary Conditions
  // Check if snake has hit edge of unit boundaries
  if (this.x >= width || this.x <= 0) {
    // Flip direction
    this.xDir *= -1;
    // Update to move the point back
    this.x = this.x + (1 * this.xDir);
    this.y = this.y + (1 * this.yDir);
  }
  // Check if Enemy has hit the y boundary of the unit
  if (this.y >= height || this.y <= 0) {
    // Flip the direction
    this.yDir *= -1;
    // Update to move the point back
    this.y = this.y + (1 * this.yDir);
  }

}

// Module.prototype.update = function() {
//   this.x = this.x + (this.speed * this.xDir);
//   if (this.x >= this.unit || this.x <= 0) {
//     this.xDir *= -1;
//     this.x = this.x + (1 * this.xDir);
//     this.y = this.y + (1 * this.yDir);
//   }
//   if (this.y >= this.unit || this.y <= 0) {
//     this.yDir *= -1;
//     this.y = this.y + (1 * this.yDir);
//   }
// }

// Custom method for drawing the object
Enemy.prototype.draw = function() {
  fill(46);
  text("enemy", this.x + 6, this.y + 6, 20, 20);
  rect(this.x, this.y, 2, 2);
  //var somey = this.y
  //console.log(somey)
}
