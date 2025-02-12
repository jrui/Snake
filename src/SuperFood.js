class SuperFood extends Food {
    
    constructor() {
        super();
        this.frameLeft = (8 * framert);
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