class EnemyShooter extends Boss {
    constructor(posX, posY, state, attackDelay, img1, img2) {
        super(posX, posY, state, attackDelay, img1, img2);
    }

    behavior(playerPosX, playerPosY){
        if(this.moveDuration < 0){
            super.moveAxisSetting();
            this.moveDuration = 30;
        }
        super.move();

        if(this.attackDelay < 0){
            super.tempSetting(playerPosX - this.x, playerPosY - this.y);
            this.attackDelay = 220;
        }
        else if(this.attackDelay > 200){
            //+= this.tempX/20;
             //+= this.tempY/20;
        }
        else if(this.attackDelay > 190){
             //-= this.tempX/10;
             //-= this.tempY/10;
        }

        this.moveDuration--;
        this.attackDelay--;
        super.isEnemyDead();
    }

    display() {
        push();
        translate(this.x, this.y, 100);
        this.lifePerColor();
        rotateZ(PI);
        image(this.img1,-40,-40,80,80);
        rotateZ(frameCount/4);
        translate(0,0,10);
        image(this.img2,-40,-40,80,80);
        pop();
    }
}