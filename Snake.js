class Snake {
  
  constructor() {
    this.pieces = [];
    this.pieces.push(new Snake_bit(floor(cols/2) * cellWidth, floor(rows/2) * cellWidth));
    this.direction = [ floor(random() * 4 + 1) ];
    this.eatSound = new Audio('plop.mp3');
  }
  

  grow() {
    this.hasGrown = true;
    this.eatSound.play();
  }


  draw() {
    switch (this.direction[0]) {
      case 1:
        this.pieces.unshift(new Snake_bit(this.pieces[0].i - cellWidth, this.pieces[0].j));
        break;
      case 2:
        this.pieces.unshift(new Snake_bit(this.pieces[0].i, this.pieces[0].j + cellWidth));
        break;
      case 3:
        this.pieces.unshift(new Snake_bit(this.pieces[0].i + cellWidth, this.pieces[0].j));
        break;
      case 4:
        this.pieces.unshift(new Snake_bit(this.pieces[0].i, this.pieces[0].j - cellWidth));
        break;
    }

    this.direction.length > 1 ? this.direction.shift() : null;
    this.pieces[0].isHead = true;
    this.pieces[1].isHead = false;
    
    if (!this.hasGrown) this.pieces.pop();
    else this.hasGrown = false;

    for(let i = 0; i < this.pieces.length; i++) {
      this.pieces[i].draw();
    }
  }


  intersect(food) {
    for(let i = 0; i < this.pieces.length; i++)
      if(this.pieces[i].intersect(food)) return true;
    return false;
  }


  self_intersect() {
    for(let i = 2; i < this.pieces.length - 1; i++)
      if(this.pieces[0].intersect(this.pieces[i])) return true;
    return false;
  }
}



function Snake_bit(i, j) {
  this.i = i;
  this.j = j;
  this.isHead = false;

  this.draw = function() {
    if (this.i > width - cellWidth) this.i = 0;
    if (this.i < 0) this.i = width - cellWidth;
    if (this.j > height - cellWidth) this.j = 0;
    if (this.j < 0) this.j = height - cellWidth;
    if (this.isHead) {
      if (framert === 8) fill(80, 200, 80);
      else fill(80, 80, 200);
    }
    else {
      if (framert === 8) fill(0, 200, 0);
      else fill(0, 0, 200);
    }
    
    if (this.isHead) rect(this.i, this.j, cellWidth, cellWidth);
    else rect(this.i + cellWidth * 0.05, this.j + cellWidth * 0.05, cellWidth * 0.9, cellWidth * 0.9);
  }

  this.intersect = function(food) {
    if (food && this.i == food.i && this.j == food.j) return true;
    else return false;
  }
}