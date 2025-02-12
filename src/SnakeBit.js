class SnakeBit {
    constructor(i, j, isHead = false) {
      this.i = i;
      this.j = j;
      this.isHead = isHead;
    }
  
  
    draw(headColor, baseColor) {
      if (this.i > width - cellWidth) this.i = 0;
      if (this.i < 0) this.i = width - cellWidth;
      if (this.j > height - cellWidth) this.j = 0;
      if (this.j < 0) this.j = height - cellWidth;
      if (this.isHead) fill(headColor[0], headColor[1], headColor[2]);
      else fill(baseColor[0], baseColor[1], baseColor[2]);
      
      if (this.isHead) rect(this.i, this.j, cellWidth, cellWidth);
      else rect(this.i + cellWidth * 0.05, this.j + cellWidth * 0.05, cellWidth * 0.9, cellWidth * 0.9);
    }
  
  
    intersect(food) {
      if (food && this.i == food.i && this.j == food.j) return true;
      else return false;
    }
  }