class Snake {
  constructor() {
    this.pieces = [];
    this.baseColor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
    this.headColor = [Math.max(this.baseColor[0] - 20, 0), Math.max(this.baseColor[1] - 20, 0), Math.max(this.baseColor[2] - 20, 0)];

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
  }


  move() {
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
    for(let i = 0; i < this.pieces.length; i++) {
      this.pieces[i].draw(this.headColor, this.baseColor);
    }

    try {
      CONNECTION.sendUpdate(this);
    } catch (e) {
      // client connection initializing
    }
  }


  intersect(food) {
    for(let i = 0; i < this.pieces.length; i++)
      if(this.pieces[i].intersect(food)) return true;
    return false;
  }


  self_intersect() {
    for(let i = 2; i < this.pieces.length; i++)
      if(this.pieces[0].intersect(this.pieces[i])) return true;
    return false;
  }
}


class DummySnake extends Snake {
  constructor(obj, lastUpdate) {
    super();
    obj && Object.assign(this, obj);
    this.lastUpdate = lastUpdate;
    this.pieces = this.pieces.map(piece => new SnakeBit(piece.i, piece.j, piece.isHead));
  }
}


let snake;