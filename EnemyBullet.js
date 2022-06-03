class EnemyBullet {
    /* 적 총알 */
    constructor() {
        this.x = 0;
        this.y = -170;
        this.axisX = random(-50, 50);
        this.axisY = random(0, 100);
        this.correctionValue = sqrt(sq(this.axisX) + sq(this.axisY));
        this.time = 0;
        this.delay = 0;
    }


    movePerTime(bossPosX, bossPosY, speed) {
        this.move(speed);
        if (this.time > 400 + this.delay) {
            this.resetSetting(bossPosX, bossPosY);
        }
        this.time++;
    }

    move(speed) {
        this.x += this.axisX / this.correctionValue * speed;
        this.y += this.axisY / this.correctionValue * speed;
    }

    resetSetting(bossPosX, bossPosY) {
        this.x = bossPosX;
        this.y = bossPosY;
        this.time = 0;
        this.axisX = random(-50, 50);
        this.axisY = random(50, 100);
        this.correctionValue = sqrt(sq(this.axisX) + sq(this.axisY));
        if(this.axisX == 0 && this.axisY == 0) this.resetSetting();
    }

    display() {
        push();
        translate(this.x, this.y);
        fill(255, 255, 0);
        sphere(4);
        pop();
    }
}