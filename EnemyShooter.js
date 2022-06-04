class EnemyShooter extends Boss {
    constructor(posX, posY, state, maxLife, attackDelay, img1, img2) {
        super(posX, posY, state, maxLife, attackDelay, img1, img2);
    }

    behavior(){
        super.movepattern();
        this.attackDelay--;
        super.isEnemyDead();
    }

    display() {
        push();
        translate(this.x, this.y);
        this.lifePerColor();
        rotateZ(PI);
        image(this.img1,-40,-40,80,80);
        rotateZ(frameCount/4);
        image(this.img2,-40,-40,80,80);
        pop();
    }
}