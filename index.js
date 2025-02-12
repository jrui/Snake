const INITIAL_CELL_WIDTH = 25;
const FRAMERATE = 10;

let cols, rows, cellWidth = INITIAL_CELL_WIDTH;

let SPEED_SWITCH = 2;
let frameCounter = 0;

let PLAYERS = [];



function updateZoomLevel() {
  cols = floor(innerWidth / INITIAL_CELL_WIDTH);
  rows = floor(innerHeight / INITIAL_CELL_WIDTH);
  createCanvas(cols * INITIAL_CELL_WIDTH, rows * INITIAL_CELL_WIDTH);
}



function setup() {
  frameRate(FRAMERATE);
  grow = 0;
  updateZoomLevel();

  snake = new Snake();
}



let grow = 0;
function draw() {
  frameCounter++;

  if (frameCounter % SPEED_SWITCH == 0) {
    background(40, 100, 40);
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

    snake.move();
    snake.draw();

    let opponent = PLAYERS.shift();
    opponent ? opponent.draw() : null;
  
  }
}