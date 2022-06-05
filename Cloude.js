class Background_Cloude1 {
    constructor() {
        this.x = random(60, 190);
        this.y = random(-400, -550);
        this.size = random(100, 150);
    }

    display() {
        push();
        translate(this.x, this.y);
        noStroke();
        fill(249);
        ellipse(this.x, this.y, this.size, this.size);
        ellipse(this.x + 70, this.y - 20, this.size, this.size);
        ellipse(this.x - 70, this.y - 20, this.size, this.size);
        pop();
    }
}

class Background_Cloude2 {
    constructor() {
        this.x = random(-250, -0);
        this.y = random(-300, -500);
        this.size = random(100, 150);
    }

    display() {
        push();
        noStroke();
        fill(249);
        ellipse(this.x, this.y, this.size, this.size);
        ellipse(this.x + 70, this.y - 20, this.size, this.size);
        ellipse(this.x - 70, this.y - 20, this.size, this.size);
        pop();
    }
}

class Background_Cloude3 {
    constructor() {
        this.x = random(0, 100);
        this.y = random(-400, -550);
        this.size = random(100, 150);
    }

    display() {
        push();
        translate(this.x, this.y);
        noStroke();
        fill(249);
        ellipse(this.x, this.y, this.size, this.size);
        ellipse(this.x + 70, this.y - 20, this.size, this.size);
        ellipse(this.x - 70, this.y - 20, this.size, this.size);
        pop();
    }
}
