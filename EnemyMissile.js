class EnemyMissile extends EnemyBullet{
    constructor() {
        super();
        this.state = 0;
        this.tempX = 0;
        this.tempY = 0;
    }

    movePerTime(bossPosX, bossPosY, playerPosX, playerPosY) {
        if(this.time > 200){
            this.time = 0;
        }
        if (this.time>130){
            this.resetSetting(bossPosX, bossPosY);
        }
        if (this.time < 130 && this.time >= 100 ){
            this.move();
            push();
            fill(230,0,0);
            rect(this.tempX-5, this.tempY-5, 10, 10);
            pop();
        }
        if(this.time == 99){
            this.axisSetting(bossPosX, bossPosY, playerPosX, playerPosY);
        }
        if (this.time > 0 && this.time < 100){
            this.resetSetting(bossPosX, bossPosY);
            this.tempSetting(playerPosX, playerPosY)
            push();
            fill(0,0,255);
            if (this.time % 20 > 9 ) fill(255,0,0);
            rect(this.tempX-5, this.tempY-5, 10, 10);
            pop();
        }
        this.time++;
    }

    move() {
        this.x += this.axisX  / 30;
        this.y += this.axisY  / 30;
    }

    resetSetting(bossPosX, bossPosY) {
        this.x = bossPosX;
        this.y = bossPosY;
    }

    axisSetting(bossPosX, bossPosY, playerPosX, playerPosY){
        this.axisX = playerPosX - bossPosX;
        this.axisY = playerPosY - bossPosY;
    }

    display(){
        push();
        translate(this.x, this.y);
        fill(0);
        rect(-0.5,-4,1,8);
        pop();
    }

    tempSetting(tempX, tempY){
        this.tempX = tempX;
        this.tempY = tempY;
    }
}