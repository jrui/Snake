function Snake() {
  this.pieces = [];
  this.pieces.push(new Snake_bit(floor(cols/2) * cellWidth, floor(rows/2) * cellWidth));
  this.pieces.push(new Snake_bit(floor(cols/2) * cellWidth - cellWidth, floor(rows/2) * cellWidth));
  this.direction = 1;
  this.hasGrown = true;
  this.audio = new Audio('plop.mp3');


  this.grow = function() {
    this.hasGrown = true;
    this.audio.play();
  }

  this.draw = function() {
    let temp = [];
    switch (this.direction) {
      case 1:
        temp.push(new Snake_bit(this.pieces[0].i - cellWidth, this.pieces[0].j));
        break;
      case 2:
        temp.push(new Snake_bit(this.pieces[0].i, this.pieces[0].j + cellWidth));
        break;
      case 3:
        temp.push(new Snake_bit(this.pieces[0].i + cellWidth, this.pieces[0].j));
        break;
      case 4:
        temp.push(new Snake_bit(this.pieces[0].i, this.pieces[0].j - cellWidth));
        break;
    }

    let size;
    if(this.hasGrown == true) {
      size = this.pieces.length;
      this.hasGrown = false;
    }
    else size = this.pieces.length - 1;
    this.pieces[0].isHead = false;
    this.pieces.reverse();

    temp[0].isHead = true;
    for(let i = 0; i < size; i++) {
      temp.push(this.pieces.pop());
      temp[i].draw();
    }
    this.pieces = temp;
  }

  this.intersect = function(food) {
    for(let i = 0; i < this.pieces.length; i++)
      if(this.pieces[i].intersect(food)) return true;
    return false;
  }

  this.self_intersect = function() {
    for(let i = 2; i < this.pieces.length - 1; i++)
      if(this.pieces[0].intersect(this.pieces[i])) return true;
    return false;
  }
}



function Snake_bit(i, j) {
  this.i = i;
  this.j = j;
  this.size = cellWidth;
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
    
    if (this.isHead) rect(this.i, this.j, this.size, this.size);
    else rect(this.i + this.size * 0.05, this.j + this.size * 0.05, this.size * 0.9, this.size * 0.9);
  }

  this.intersect = function(food) {
    if (food && this.i == food.i && this.j == food.j) return true;
    else return false;
  }
}