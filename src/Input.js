
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
      SPEED_SWITCH = SPEED_SWITCH === 2 ? 1 : 2;
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
          console.log('Snake: ', snake);
          console.log('Columns: ', cols, 'Rows: ', rows, 'Cell width: ', cellWidth);
          console.log('Players: ', PLAYERS);
        }, 2500);
        debug = true;
      }
      break;
  }
}