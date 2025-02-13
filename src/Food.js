class Food {
    
    constructor() {
        this.i = floor(random(0, cols)) * cellWidth;
        this.j = floor(random(0, rows)) * cellWidth;
        this.despawnTime = Date.now() + 10000; // 15 seconds
        this.radix = cellWidth / 2;
        this.addRadix = true;    

        try {
            if (debug) console.log('Food created at: ', food.i, food.j);
        }
        catch (e) {
            // do nothing
        }
    }

    draw() {
        this.addRadix == true ? this.radix += 2 : this.radix -= 2;
        if(this.addRadix) {
            fill(200, 0, 0);
            ellipse(this.i + cellWidth / 2, this.j + cellWidth / 2, this.radix, this.radix);
            this.addRadix = false;
        }
        else {
            fill(100, 0, 0);
            ellipse(this.i + cellWidth / 2, this.j + cellWidth / 2, this.radix, this.radix);
            this.addRadix = true;
        }
    }
}



function handleFood() {
    if(snake.intersect(food)) {
        snake.hasToGrow++;
        food = new Food();
    }
    if(!food) {
        if(random() > 0.9) {
            food = new Food();
        }
    }
    else if (food.despawnTime < Date.now()) {
        food = null;
    }

    food? food.draw() : null;
}

  

let food;