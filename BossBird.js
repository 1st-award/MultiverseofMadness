class BossBird extends Boss{
    constructor(posX, posY, state, maxLife, attackDelay, img1, img2) {
        super(posX, posY, state, maxLife, attackDelay, img1, img2);
    }

    behavior(playerPosX, playerPosY){
        /* 플레이어까지의 거리 재설정 */
        if(enemyStop == false) {
            if (this.attackDelay < 0) {
                super.tempSetting(playerPosX - this.x, playerPosY - this.y);
                this.attackDelay = 220;
            }
            /* 돌진 */
            else if (this.attackDelay > 197) {
                birdSound.play();
                this.x += this.tempX / 20;
                this.y += this.tempY / 20;
            }
            /* 복귀 */
            else if (this.attackDelay > 187) {
                this.x -= this.tempX / 10;
                this.y -= this.tempY / 10;
            } else if (this.attackDelay == 187) {
                birdSound.stop();
            }
            /* 기본 움직임 */
            else {
                super.movepattern();
            }
            this.attackDelay--;
        }
        super.isEnemyDead();
    }

    display(playerPosX, playerPosY){
        push();
        let a = atan2(playerPosY - this.y , playerPosX  - this.x);
        translate(this.x, this.y);
        super.lifePerColor();
        rotateZ(a - PI/2);                                                  // 플레이어를 보게 하는 각도 설정
        if(frameCount%10 > 5) image(this.img1,-32,-32,64,64);
        else image(this.img1,-32,-32,64,64);
        pop();
    }
}