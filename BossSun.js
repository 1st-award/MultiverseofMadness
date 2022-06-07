class BossSun extends Boss{
    constructor(posX, posY, state, maxLife, attackDelay, img1, img2) {
        super(posX, posY, state, maxLife, attackDelay, img1, img2);
        this.patternAState = 0;
        this.patternAObject = [];
        this.patternBLeftObject = [];
        this.patternBRightObject = [];
        this.temp = 0;
        for(let i = 0; i < 200; i++){
            this.patternAObject[i] = new BossSunPatternA();
        }
        for(let i = 0; i < 50; i++){
            this.patternBLeftObject[i] = new BossSunPatternBLeft();
            this.patternBRightObject[i] = new BossSunPatternBRight();
        }
    }

    behavior(playerPosX, playerPosY){
        if(!backgroundBossSunSound.isPlaying()){
            backgroundBossSunSound.setVolume(0.6);
            backgroundBossSunSound.play();
        }
        this.pattern();
        /* 폭탄의 지속이 끝날 때 */
        if (flightBombDelayCount < 0) {
            /* 총알 멈춤이 끝날 때 */
            if (enemyBulletStop == false) {
                /* 패턴 A 지정 */
                if (this.attackDelay < 300 && this.attackDelay >= 200) {
                    if(this.attackDelay % 10 == 9){
                        fireBallSound.setVolume(0.4);
                        fireBallSound.play();
                    }
                    this.patternA(this.attackDelay - 200);
                    this.patternA(this.attackDelay - 100);
                }
                /* 패턴A 지정 안하는 상태 */
                else {
                    this.patternAState = 0;
                }
                /* 플레이어 위치 값 저장 */
                if (this.attackDelay <= 100 && this.attackDelay % 10 == 9) {
                    fireBallSound.setVolume(0.8);
                    fireBallSound.play();
                    this.tempSetting(playerPosX, playerPosY + random(-10, -5));
                    this.temp = (this.attackDelay - 1) / 2;
                }
                /* 패턴 B 지정 */
                if (this.attackDelay < 100 && this.attackDelay % 2 == 0) {
                    this.patternB(this.attackDelay / 2);
                }
                /* 패턴 B 지정 안하는 상태 */
                else {
                    this.patternBState = 0;
                }
                /* 값 재설정 */
                if (this.attackDelay < 0) {
                    this.attackDelay = 400;
                }
                /* 패턴 A 움직이는 시간 지정 */
                if (this.attackDelay < 300 && this.attackDelay > 0) {
                    for (let i = 0; i < 200; i++) {
                        this.patternAObject[i].move();
                    }
                }
                /* 패턴 B 움직이는 시간 지정 */
                if (this.attackDelay < 100 || this.attackDelay > 300) {
                    for (let i = 0; i < 50; i++) {
                        this.patternBLeftObject[i].move();
                        this.patternBRightObject[i].move();
                    }
                }
                this.attackDelay--;
            }
        }
        super.isEnemyDead();
    }

    /* 디스플레이 함수 */
    display(){
        push();
        translate(this.x, this.y);
        if(this.patternAState == 1) rotateZ(frameCount/20);
        if(this.patternBState == 1) rotateZ(frameCount/10);
        if(frameCount%100 > 50) image(this.img1,-300,-300,600,600);
        else image(this.img2,-300,-300,600,600);
        pop();
    }

    /* 플레이어 끌어들이기 함수 */
    pattern(){
        let tempX = this.x - flight.x;
        let tempY = this.y - flight.y;
        flight.x += tempX / sqrt(sq(tempX) + sq(tempY));
        flight.y += tempY / sqrt(sq(tempX) + sq(tempY));
    }

    /* 랜덤 방향으로 발사 함수 */
    patternA(i){
        this.patternAState = 1;
        this.patternAObject[i].resetSetting(this.x, this.y);
    }

    /* 플레이어 쪽으로 발사 함수 */
    patternB(i){
        this.patternBState = 1;
        this.patternBLeftObject[i].resetSetting(i, this.x, this.y, this.tempX, this.tempY, this.temp);
        this.patternBRightObject[i].resetSetting(i, this.x, this.y, this.tempX, this.tempY, this.temp);
    }
}

class BossSunPatternA{
    constructor() {
        this.x = 1000;
        this.y = 1000;
        this.speed = 5;
        this.axisX = 1;
        this.axisY = 1;
        this.correctionValue = 1;
        this.img = yellowMeteoImage;
    }

    move() {
        this.x += this.axisX / this.correctionValue * this.speed;
        this.y += this.axisY / this.correctionValue * this.speed;
    }

    resetSetting(bossPosX, bossPosY) {
        this.x = bossPosX;
        this.y = bossPosY;
        this.axisX = random(-50, 50);
        this.axisY = random(1, 100);
        this.correctionValue = sqrt(sq(this.axisX) + sq(this.axisY));
    }

    display(){
        push();
        translate(this.x, this.y);
        rotateZ(5 * PI/4 + +atan2(this.axisY , this.axisX));
        image(this.img, -20, -20, 40, 40);
        pop();
    }
}

class BossSunPatternB{
    constructor() {
        this.x = 1000;
        this.y = 1000;
        this.speed = 5;
        this.axisX = 1;
        this.axisY = 1;
        this.correctionValue = 1;
        this.img = redMeteoImage;
    }

    move() {
        this.x += this.axisX / this.correctionValue * this.speed;
        this.y += this.axisY / this.correctionValue * this.speed;
        this.speed += 0.4;
    }

    resetSetting(i, bossPosX, bossPosY, playerPosX, playerPosY, temp) {
        this.x = bossPosX;
        this.y = bossPosY;
        this.speed = 5;
        this.axisX = playerPosX - bossPosX;
        this.axisY = playerPosY - bossPosY;
        this.correctionValue = sqrt(sq(this.axisX) + sq(this.axisY));
    }

    display(){
        push();
        translate(this.x, this.y);
        rotateZ(5 * PI/4 + +atan2(this.axisY , this.axisX));
        image(this.img, -20, -20, 40, 40);
        pop();
    }
}

/* 패턴 B 왼쪽 방향 클래스 */
class BossSunPatternBLeft extends BossSunPatternB{
    constructor() {
        super();
    }

    resetSetting(i, bossPosX, bossPosY, playerPosX, playerPosY, temp) {
        this.x = bossPosX;
        this.y = bossPosY;
        this.speed = 5;
        this.axisX = playerPosX - bossPosX - (temp - i) * 20;
        this.axisY = playerPosY - bossPosY;
        this.correctionValue = sqrt(sq(this.axisX) + sq(this.axisY));
    }
}

/* 패턴 B 오른쪽 방향 클래스 */
class BossSunPatternBRight extends BossSunPatternB{
    constructor() {
        super();
    }

    resetSetting(i, bossPosX, bossPosY, playerPosX, playerPosY, temp) {
        this.x = bossPosX;
        this.y = bossPosY;
        this.speed = 5;
        this.axisX = playerPosX - bossPosX + (temp - i) * 20;
        this.axisY = playerPosY - bossPosY;
        this.correctionValue = sqrt(sq(this.axisX) + sq(this.axisY));
    }
}