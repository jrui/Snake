let cols, rows;
let cellWidth = 20;
let despawn = false;
let food;
let framert = 8;
let multiplier = 1;
let snake;
let score = 0;

function setup() {
  cols = floor(innerWidth / cellWidth);
  rows = floor(innerHeight / cellWidth);
  createCanvas(cols * cellWidth, rows * cellWidth);
  frameRate(framert);

  snake = new Snake();
  food = new Food();
}

function draw() {
  //background(51);
  background(40, 100, 40);
  snake.draw();
  if(snake.intersect(food)) {
    snake.grow();
    score += food.points;
    food = new Food();
  }

  if(snake.self_intersect()) {
    score = 0;
    snake = new Snake();
  }

  if(despawn) {
    if(random() > 0.9) {
      despawn = false;
      food = new Food();
    }
  }
  else {
    food.frameLeft--;
    if(food.frameLeft <= 0) despawn = true;
    food.draw();
  }
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      if (snake.direction == 3) snake.direction = 3;
      else snake.direction = 1;
      break;
    case RIGHT_ARROW:
      if (snake.direction == 1) snake.direction = 1;
      else snake.direction = 3;
      break;
    case UP_ARROW:
      if (snake.direction == 2) snake.direction = 2;
      else snake.direction = 4;
      break;
    case DOWN_ARROW:
      if (snake.direction == 4) snake.direction = 4;
      else snake.direction = 2;
      break;
    case 32:
      framert = framert === 8 ? 14 : 8
      frameRate(framert);
      break;
    case ENTER:
      setup();
      break;
  }
}