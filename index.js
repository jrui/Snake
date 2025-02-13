const INITIAL_CELL_WIDTH = 25;
const FRAMERATE = 10;

let cols, rows, cellWidth = INITIAL_CELL_WIDTH;
let frameCounter = 0;

let PLAYERS = {};
let startTimer = 0;



function updateZoomLevel() {
  cols = floor(innerWidth / INITIAL_CELL_WIDTH);
  rows = floor(innerHeight / INITIAL_CELL_WIDTH);
  createCanvas(cols * INITIAL_CELL_WIDTH, rows * INITIAL_CELL_WIDTH);
}



initialized = false;
async function start() {
  frameRate(FRAMERATE);
  updateZoomLevel();

  snake = new Snake(cols * INITIAL_CELL_WIDTH, rows * INITIAL_CELL_WIDTH, INITIAL_CELL_WIDTH);
  startTimer = snake.spawnTime;

  await snake.signalSpawn();
  initialized = true;
}



async function draw() {
  if(!initialized) return;
  
  frameCounter++;
  background(40, 100, 40);

  Object.keys(PLAYERS).forEach(id => {
    if(Date.now() - PLAYERS[id].lastUpdateReceived > 10000) {
      delete PLAYERS[id];
    }
  });

  Object.keys(PLAYERS).forEach(id => {
    PLAYERS[id].draw();
  });

  if(snake.self_intersect() || snake.headIntersectsPlayer()) {
    alert(`Game Over\nScore: ${snake.pieces.length}`);
    await start();
  }
  handleFood();
  handleSuperFood();
  snake.draw();
}