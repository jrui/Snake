class SuperFood extends Food {
    
    constructor() {
        super();
        this.despawnTime = Date.now() + 5000; // 8 seconds
        SOUND_ASSETS.superFoodSpawn();
    }

    draw() {
        this.addRadix == true ? this.radix += 4 : this.radix -= 4;
        if(this.addRadix) {
            fill(200, 0, 200);
            ellipse(this.i + cellWidth / 2, this.j + cellWidth / 2, this.radix, this.radix);
            this.addRadix = false;
        }
        else {
            fill(100, 0, 100);
            ellipse(this.i + cellWidth / 2, this.j + cellWidth / 2, this.radix, this.radix);
            this.addRadix = true;
        }
    }
}


function handleSuperFood() {
    if (snake.intersect(superfood)) {
        snake.hasToGrow += 10;
        superfood = null;
    }
  
    if (!superfood) {
        if (random() > 0.996) {
            superfood = new SuperFood();
        }
    }
    else if (superfood.despawnTime < Date.now()) {
        superfood = null;
    }
  
    superfood? superfood.draw() : null;
}


let superfood;