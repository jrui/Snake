let cols, rows;
let cellWidth = 20;
let food, superfood;
let framert = 8;
let snake;
let superFoodSpawnSound = new Audio('superfood spawn.wav');

function setup() {
  cols = floor(innerWidth / cellWidth);
  rows = floor(innerHeight / cellWidth);
  createCanvas(cols * cellWidth, rows * cellWidth);
  frameRate(framert);

  snake = new Snake();
}

let grow = 0;
function draw() {
  //background(51);
  background(40, 100, 40);
  snake.draw();

  if (grow > 0) {
    snake.grow();
    grow--;
  }

  if(snake.self_intersect()) {
    snake = new Snake();
  }

  handleFood();
  handleSuperFood();
  
  if(snake.intersect(superfood)) {
    grow += 5;
    superfood = null;
  }
}


function handleSuperFood() {
  if(snake.intersect(superfood)) {
    grow += 20;
    superfood = null;
  }

  if (!superfood) {
    if (random() > 0.998) {
      superfood = new SuperFood();
      superFoodSpawnSound.play();
    }
  }
  else {
    superfood.frameLeft--;
    if (superfood.frameLeft <= 0) superfood = null;
  }

  superfood? superfood.draw() : null;
}


function handleFood() {
  if(snake.intersect(food)) {
    grow++;
    food = new Food();
  }

  if(!food) {
    if(random() > 0.9) food = new Food();
  }
  else {
    food.frameLeft--;
    if(food.frameLeft <= 0) food = null;
  }

  food? food.draw() : null;
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