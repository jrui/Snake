class Food {
    
    constructor() {
        this.i = floor(random(0, cols)) * cellWidth;
        this.j = floor(random(0, rows)) * cellWidth;
        this.frameLeft = (15 * framert);
        this.radix = cellWidth / 2;
        this.addRadix = true;    
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