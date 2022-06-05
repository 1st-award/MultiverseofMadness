class Forest1 {
    constructor(y) {
        this.x = random(70, 90);
        this.y = y;
        this.watery = random(-400, -600);
        this.waterX = random(-80, 80);
        this.waterSizeX = random(5, 10);
        this.waterSizeY = random(20, 30);
        this.value = random(-PI / 36, PI / 36);
    }

    display() {
        push();
        translate(this.waterX, this.watery);
        noStroke();
        fill(0, 150, 200);
        rect(this.waterX, this.watery, this.waterSizeX, this.waterSizeY);
        pop();
        push();
        translate(this.x, this.y);
        rotateZ(this.value);
        image(treeimg, this.x, this.y);
        pop();
    }
}

class Forest2 {
    constructor(y) {
        this.x = random(-180, -200);
        this.y = y;
        this.watery = random(-700, -900);
        this.waterX = random(-80, 80);
        this.waterSizeX = random(5, 10);
        this.waterSizeY = random(20, 30);
        this.value = random(-PI / 24, PI / 24);
    }

    display() {
        push();
        translate(this.waterX, this.watery);
        noStroke();
        fill(0, 150, 200);
        rect(this.waterX, this.watery, this.waterSizeX, this.waterSizeY);
        pop();
        push();
        translate(this.x, this.y);
        rotateZ(this.value);
        image(treeimg, this.x, this.y);
        pop();
    }
}
