class BossSun extends Boss{
    constructor(posX, posY, state, maxLife, attackDelay, img1, img2) {
        super(posX, posY, state, maxLife, attackDelay, img1, img2);
    }

    behavior(){
        if(this.moveDuration < 0){
            super.moveAxisSetting();
            this.moveDuration = 30;
        }
        super.move();
        this.moveDuration--;
        super.isEnemyDead();
    }

    display(){
        push();
        translate(this.x, this.y);
        if(frameCount%10 > 5) image(this.img1,-32,-32,64,64);
        else image(this.img2,-32,-32,64,64);
        pop();
    }
}