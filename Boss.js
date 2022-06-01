class Boss{
    constructor(posX, posY, state, img) {
        this.x = posX;
        this.y = posY;
        this.state = state;
        this.img = img;
        this.life = 11;
        this.attackDelay = 200;
        this.speed = 2;
        this.axisX = random(-50, 50);
        this.axisY = random(-50, 50);
        this.correctionValue = sqrt(sq(this.axisX) + sq(this.axisY));;
        this.moveDuration = 30;
        this.tempX = 0;
        this.tempY = 0;
        this.hitDelay = 0;
    }

    move(){
        this.x += (this.axisX / this.correctionValue * this.speed);
        this.y += (this.axisY / this.correctionValue * this.speed);
    }

    moveAxisSetting(){
        this.axisX = random(-50, 50);
        this.axisY = random(-50, 50);
        this.moveAxisLimit();
        this.correctionValue = sqrt(sq(this.axisX) + sq(this.axisY));
        if(this.axisX == 0 && this.axisY == 0) this.moveAxisSetting();
    }

    moveAxisLimit(){
        if(this.x > 235){
            this.axisX = -abs(this.axisX);
        }
        if(this.x < -235){
            this.axisX = abs(this.axisX);
        }
        if(this.y < -235){
            this.axisY = abs(this.axisY)
        }
        if(this.y > -100){
            this.axisY = -abs(this.axisY)
        }
    }

    tempSetting(tempX, tempY){
        this.tempX = tempX;
        this.tempY = tempY;
    }

    lifePerColor() {
        if (this.life == 1) {
            fill(0);
        }
        if (this.life <= 3 && this.life > 1) {
            if (frameCount % 2 == 1) {
                fill(127);
            }
            if (frameCount % 2 == 0) {
                fill(255);
            }
        }

        if (this.life < 10 && this.life > 3) {
            fill(255, 0, 0);
        }
        if (this.life > 10) {
            fill(255);
        }
    }

    hitBox(flightBullet, flightDamage){
        if (abs(flightBullet.x - this.x) < 40 && abs(flightBullet.y - this.y) < 3
            && this.hitDelay < 0 && this.state == 1) {
            this.life -= flightDamage;
            this.hitDelay = 10;
        }
        this.hitDelay--;
    }

    isEnemyDead(){
        if (this.life < 0) {
            this.state = ENEMY_DIE;
        }
    }
}