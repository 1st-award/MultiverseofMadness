class EnemyBullet {
    /* 적 총알 */
    constructor() {
        this.x = 0;
        this.y = -170;
        this.axisX = random(-50, 50);
        this.axisY = random(0, 100);
        this.speed = 10;
        this.time = 0;
        this.delay = 0;
    }


    move() {
        if (this.time > this.delay) {
            this.x += this.axisX / 10;
            this.y += this.axisY / 10;
        }
        this.time++;
    }


    display() {
        push();
        translate(this.x, this.y, 200);

        if (this.time > 200 + this.delay) {
            this.x = 0;
            this.y = -170;
            this.time = 0;
            this.axisX = random(-50, 50);
            this.axisY = random(0, 100);
        }

        fill(255, 255, 0);
        sphere(4);
        pop();
    }
}