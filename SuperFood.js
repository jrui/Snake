class SuperFood {
    
    constructor() {
        this.i = floor(random(0, cols)) * cellWidth;
        this.j = floor(random(0, rows)) * cellWidth;
        this.frameLeft = (5 * framert);
        this.radix = cellWidth / 2;
        this.addRadix = true;    
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