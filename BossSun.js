class BossSun extends Boss{
    constructor(posX, posY, state, attackDelay, img1, img2) {
        super(posX, posY, state, attackDelay, img1, img2);
    }

    behavior(){
        if(this.moveDuration < 0){
            super.moveAxisSetting();
            this.moveDuration = 30;
        }
        super.move();
        this.moveDuration--;
    }

    display(){
        push();
        translate(this.x, this.y, 100);
        if(frameCount%10 > 5) image(this.img1,-32,-32,64,64);
        else image(this.img2,-32,-32,64,64);
        pop();
    }
}