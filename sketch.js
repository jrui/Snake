let cols, rows;
let w = 20;
let despawn = false;
let food;
let framert = 8;
let multiplier = 1;
let snake;
let score = 0;

function setup() {
  createCanvas(window.innerWidth - 3, window.innerHeight - 4);
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(framert);

  snake = new Snake();
  food = new Food();
}

function draw() {
  //background(51);
  background(40, 100, 40);
  snake.draw();
  if(snake.intersect(food)) {
    snake.grow();
    score += food.points;
    food = new Food();
  }

  if(snake.self_intersect()) {
    score = 0;
    snake = new Snake();
  }

  if(despawn) {
    if(random() > 0.9) {
      despawn = false;
      food = new Food();
    }
  }
  else {
    food.frameLeft--;
    if(food.frameLeft <= 0) despawn = true;
    food.draw();
  }
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
  }
}

function Snake_bit(i, j) {
  this.i = i;
  this.j = j;
  this.size = w;
  this.isHead = false;

  this.draw = function() {
    if(this.i > width - w) this.i = 0;
    if(this.i < 0) this.i = width - w;
    if(this.j > height - w) this.j = 0;
    if(this.j < 0) this.j = height - w;
    if(this.isHead) fill(80, 200, 80);
    else fill(0, 200, 0);
    rect(this.i, this.j, this.size, this.size);
  }

  this.intersect = function(food) {
    if(this.i == food.i && this.j == food.j)
      return true;
    else return false;
  }
}


function Snake() {
  this.pieces = [];
  this.pieces.push(new Snake_bit(floor(cols/2)*w, floor(rows/2)*w));
  this.pieces.push(new Snake_bit(floor(cols/2)*w - w, floor(rows/2)*w));
  this.direction = 1;
  this.hasGrown = true;

  this.grow = function() {
    this.hasGrown = true;
  }

  this.draw = function() {
    let temp = [];
    switch (this.direction) {
      case 1:
        temp.push(new Snake_bit(this.pieces[0].i - w, this.pieces[0].j));
        break;
      case 2:
        temp.push(new Snake_bit(this.pieces[0].i, this.pieces[0].j + w));
        break;
      case 3:
        temp.push(new Snake_bit(this.pieces[0].i + w, this.pieces[0].j));
        break;
      case 4:
        temp.push(new Snake_bit(this.pieces[0].i, this.pieces[0].j - w));
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

function Food() {
  this.i = floor(random(0, cols)) * w;
  this.j = floor(random(0, rows)) * w;
  this.points = floor(random(50, 100));
  this.frameLeft = (10 * framert) / multiplier;
  this.radix = w/2;
  this.addRadix = true;

  this.draw = function() {
    this.addRadix == true ? this.radix += 2 : this.radix -= 2;
    if(this.addRadix) {
      fill(200, 0, 0);
      ellipse(this.i + w/2, this.j + w/2, this.radix, this.radix);
      this.addRadix = false;
    }
    else {
      fill(100, 0, 0);
      ellipse(this.i + w/2, this.j + w/2, this.radix, this.radix);
      this.addRadix = true;
    }
  }
}
