let cols, rows;
let food, superfood;
let snake;
let superFoodSpawnSound = new Audio('superfood spawn.wav');

const INITIAL_CELL_WIDTH = 25;
let framert = 8;
let cellWidth;



function updateZoomLevel(cellWidth) {
  cols = floor(innerWidth / cellWidth);
  rows = floor(innerHeight / cellWidth);
  createCanvas(cols * cellWidth, rows * cellWidth);
}



function setup() {
  grow = 0;
  framert = 8;
  cellWidth = INITIAL_CELL_WIDTH;

  updateZoomLevel(cellWidth);
  frameRate(framert);
  snake = new Snake();
}



let grow = 0;
function draw() {
  background(40, 100, 40);
  snake.draw();

  if (grow > 0) {
    snake.grow();
    grow--;
  }

  if(snake.self_intersect()) {
    alert(`Game Over\nScore: ${snake.pieces.length}`);
    setup();
  }

  handleFood();
  handleSuperFood();
}



function handleSuperFood() {
  if(snake.intersect(superfood)) {
    grow += 10;
    superfood = null;
  }

  if (!superfood) {
    if (random() > 0.998) {
      superfood = new SuperFood();
      superFoodSpawnSound.play();
      if (debug) console.log('Superfood created at: ', superfood.i, superfood.j);
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
    if(random() > 0.9) {
      food = new Food();
      if (debug) console.log('Food created at: ', food.i, food.j);
    }
  }
  else {
    food.frameLeft--;
    if(food.frameLeft <= 0) food = null;
  }

  food? food.draw() : null;
}



let debug = false;
let interval;
function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      if (snake.direction[snake.direction.length - 1] !== 3) snake.direction.push(1);
      break;

    case RIGHT_ARROW:
      if (snake.direction[snake.direction.length - 1] !== 1) snake.direction.push(3);
      break;

    case UP_ARROW:
      if (snake.direction[snake.direction.length - 1] !== 2) snake.direction.push(4);
      break;

    case DOWN_ARROW:
      if (snake.direction[snake.direction.length - 1] !== 4) snake.direction.push(2);
      break;

    case 32:
      framert = framert === 8 ? 14 : 8
      frameRate(framert);
      break;

    case ENTER:
      setup();
      break;

    case 68:
      // debug
      if (debug) {
        debug = false;
        clearInterval(interval);
      }
      else {
        interval = setInterval(() => {
          console.log('Snake size: ', snake.pieces.length, 'Snake head: ', snake.pieces[0].i, snake.pieces[0].j);
          console.log('Snake growing: ', grow);
          console.log('Columns: ', cols, 'Rows: ', rows, 'Cell width: ', cellWidth);
        }, 5000);
        debug = true;
      }
      break;
  }
}