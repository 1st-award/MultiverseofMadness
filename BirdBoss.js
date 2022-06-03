class BirdBoss extends Boss{
    constructor(posX, posY, state, maxLife, attackDelay, img1, img2) {
        super(posX, posY, state, maxLife, attackDelay, img1, img2);
    }

    behavior(playerPosX, playerPosY){
        if(this.attackDelay < 0){
            super.tempSetting(playerPosX - this.x, playerPosY - this.y);
            this.attackDelay = 220;
        }
        else if(this.attackDelay > 197){
            this.x += this.tempX/20;
            this.y += this.tempY/20;
        }
        else if(this.attackDelay > 187){
            this.x -= this.tempX/10;
            this.y -= this.tempY/10;
        }
        else {
            if(this.moveDuration < 0){
                super.moveAxisSetting();
                this.moveDuration = 30;
            }
            super.move();
            this.moveDuration--;
        }
        this.attackDelay--;
        super.isEnemyDead();
    }

    display(playerPosX, playerPosY){
        push();
        let a = atan2(playerPosY - this.y , playerPosX  - this.x);
        translate(this.x, this.y);
        super.lifePerColor();
        rotateZ(a - PI/2);
        if(frameCount%10 > 5) image(this.img1,-32,-32,64,64);
        else image(this.img1,-32,-32,64,64);
        pop();
    }
}