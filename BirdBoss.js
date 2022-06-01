class BirdBoss extends Boss{
    constructor(posX, posY, state, img) {
        super(posX, posY, state, img);
    }

    behavior(playerPosX, playerPosY){
        if(this.attackDelay < 0){
            super.tempSetting(playerPosX - this.x, playerPosY - this.y);
            this.attackDelay = 220;
        }
        else if(this.attackDelay > 200){
            this.x += this.tempX/20;
            this.y += this.tempY/20;
        }
        else if(this.attackDelay > 190){
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

    display(){
        push();
        translate(this.x, this.y, 100);
        super.lifePerColor();
        sphere(40);
        pop();
    }
}