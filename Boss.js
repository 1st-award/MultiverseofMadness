class Boss{
    constructor(posX, posY, state, maxLife, attackDelay, img1, img2) {
        this.x = posX;
        this.y = posY;
        this.state = state;
        this.img1 = img1;
        this.img2 = img2;
        this.maxLife = maxLife;
        this.life = maxLife;
        this.attackDelay = attackDelay;
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
        if(this.x > 230){
            this.axisX = -abs(this.axisX);
        }
        if(this.x < -230){
            this.axisX = abs(this.axisX);
        }
        if(this.y < -230){
            this.axisY = abs(this.axisY)
        }
        if(this.y > -105){
            this.axisY = -abs(this.axisY)
        }
    }

    tempSetting(tempX, tempY){
        this.tempX = tempX;
        this.tempY = tempY;
    }

    lifePerColor() {
        if (this.life == 0) {
            if (frameCount % 10 > 4) {
                fill(127);
            }
            else{
                fill(255);
            }
        }

        if (this.life <= this.maxLife && this.life > 0) {
            fill(255, 0, 0);
        }
        if (this.life > this.maxLife/2) {
            fill(0,0,255);
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

    displayBossHP(posX,posY,width,height){
        image(this.img1, posX, posY, height, height);
        push();
        this.lifePerColor()
        rect(posX+height,posY,(this.life+1)*(width-height)/(this.maxLife+1),height);
        noFill();
        stroke(0);
        strokeWeight(4);
        for (let i = 0; i < this.maxLife+1; i++){
            rect(posX+height+i*(width-height)/(this.maxLife+1),posY,(width-height)/(this.maxLife+1),height);
        }
        pop();
    }
}