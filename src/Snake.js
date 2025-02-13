class Snake {
  constructor() {
    this.pieces = [];
    this.baseColor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
    this.headColor = [Math.max(this.baseColor[0] - 20, 0), Math.max(this.baseColor[1] - 20, 0), Math.max(this.baseColor[2] - 20, 0)];
    this.speed = 2;
    this.hasToGrow = 0;

    this.spawnTime = Date.now();
    this.lastUpdateReceived = 0;

    this.pieces.push(new SnakeBit(
      floor(random() * cols) * cellWidth,
      floor(random() * rows) * cellWidth,
      true
    ));
    this.direction = [ floor(random() * 4 + 1) ];
  }
  

  grow() {
    this.hasGrown = true;
    SOUND_ASSETS.snakeEat();
    CONNECTION.sendUpdate(this, 'has_grown');
  }


  move() {
    if (this.hasToGrow > 0) {
      this.grow();
      this.hasToGrow--;
    }
  
    switch (this.direction[0]) {
      case 1:
        this.pieces.unshift(new SnakeBit(
          this.pieces[0].i - cellWidth,
          this.pieces[0].j
        ));
        break;
      case 2:
        this.pieces.unshift(new SnakeBit(
          this.pieces[0].i,
          this.pieces[0].j + cellWidth
        ));
        break;
      case 3:
        this.pieces.unshift(new SnakeBit(
          this.pieces[0].i + cellWidth,
          this.pieces[0].j
        ));
        break;
      case 4:
        this.pieces.unshift(new SnakeBit(
          this.pieces[0].i,
          this.pieces[0].j - cellWidth
        ));
        break;
    }

    this.direction.length > 1 ? this.direction.shift() : null;
    this.pieces[0].isHead = true;
    this.pieces[1].isHead = false;
    
    if (!this.hasGrown) this.pieces.pop();
    else this.hasGrown = false;
  }


  draw() {
    if (frameCounter % this.speed == 0) {
      this.move();
      if (this.spawnTime === startTimer && frameCounter % (this.speed * 10) === 0) {
        // send Keep alive every 100 updateable frames this snake is alive
        CONNECTION.sendUpdate(this, 'keep_alive');
      }
    }
    
    for(let i = 0; i < this.pieces.length; i++) {
      try {
        this.pieces[i].draw(this.headColor, this.baseColor);
      } catch(e) {
        new SnakeBit(this.pieces[i].i, this.pieces[i].j).draw(this.headColor, this.baseColor);
      }
    }
  }


  intersect(food) {
    for (let i = 0; i < this.pieces.length; i++) {
      try {
        if (this.pieces[i].intersect(food)) return true;
      }
      catch(e) {
        if (new SnakeBit(this.pieces[i].i, this.pieces[i].j).intersect(food)) return true;
      }
    }
    return false;
  }


  self_intersect() {
    for(let i = 2; i < this.pieces.length; i++)
      if(this.pieces[0].intersect(this.pieces[i])) return true;
    return false;
  }


  headIntersectsPlayer() {
    for(let id in PLAYERS) {
      if(PLAYERS[id].intersect(this.pieces[0])) return true;
    }
    return false;
  }


  async changeDirection(direction) {
    this.direction.push(direction);
    await CONNECTION.sendUpdate(this, 'direction_change');
  }


  async changeSpeed(speed) {
    this.speed = speed;
    await CONNECTION.sendUpdate(this, 'speed_change');
  }


  async signalSpawn() {
    await CONNECTION.sendUpdate(this, 'spawn');
  }
}

let snake;