class BossHelicopter extends Boss {
    constructor(posX, posY, state, maxLife, attackDelay, img1, img2) {
        super(posX, posY, state, maxLife, attackDelay, img1, img2);
        this.patternBulletObject = [];
        this.patternMissileObject = [];
        for(let i = 0; i < 200; i++){
            this.patternBulletObject[i] = new BossHelicopterBullet();
            this.patternBulletObject[i].delay = i;
        }
        for(let i = 0; i < 2; i++){
            this.patternMissileObject[i] = new BossHelicopterMissile();
        }
    }

    behavior(){
        super.movepattern();
        /* 폭탄이 지속이 끝날 떄 */
        if (flightBombDelayCount < 0) {
            /* 총알 멈춤이 끝날 때 */
            if (enemyBulletStop == false) {
                this.patternBullet();
                this.patternMissile();
            }
        }
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

    /* 총알 함수 */
    patternBullet() {
        for (let j = 0; j < 200; j += 2) {
            bossHelicopter.patternBulletObject[j].delay = j;
            bossHelicopter.patternBulletObject[j].movePerTime(this.x - 12, this.y + 23, 2);
            bossHelicopter.patternBulletObject[j + 1].delay = j + 1;
            bossHelicopter.patternBulletObject[j + 1].movePerTime(this.x + 17, this.y + 23, 2);
        }
        bossHelicopter.patternMissileObject[0].movePerTime(this.x - 7, this.y + 25, flight.x, flight.y);
        bossHelicopter.patternMissileObject[1].movePerTime(this.x + 11, this.y + 25, flight.x, flight.y);
    }

    /* 미사일 함수 */
    patternMissile(){
        bossHelicopter.patternMissileObject[0].movePerTime(this.x - 7, this.y + 25, flight.x, flight.y);
        bossHelicopter.patternMissileObject[1].movePerTime(this.x + 11, this.y + 25, flight.x, flight.y);
    }
}

/* 총알클래스 */
class BossHelicopterBullet {
    constructor() {
        this.x = 1000;
        this.y = 0;
        this.axisX = 0;
        this.axisY = 0;
        this.correctionValue = 0;
        this.time = 0;
        this.delay = 0;
    }


    movePerTime(bossPosX, bossPosY, speed) {
        this.move(speed);
        if (this.time > 400 + this.delay) {
            this.resetSetting(bossPosX, bossPosY);
        }
        this.time++;
    }

    /* 이동 (랜덤) 함수 */
    move(speed) {
        this.x += this.axisX / this.correctionValue * speed;
        this.y += this.axisY / this.correctionValue * speed;
    }

    /* 리셋 세팅 함수 */
    resetSetting(bossPosX, bossPosY) {
        this.x = bossPosX;
        this.y = bossPosY;
        this.time = 0;
        this.axisX = random(-50, 50);
        this.axisY = random(50, 100);
        this.correctionValue = sqrt(sq(this.axisX) + sq(this.axisY));
    }

    /* 디스플레이 함수 */
    display() {
        push();
        translate(this.x, this.y);
        fill(255, 255, 0);
        sphere(4);
        pop();
    }
}

/* 미사일 클래스 */
class BossHelicopterMissile{
    constructor() {
        this.x = 1000;
        this.y = 0;
        this.axisX = 0;
        this.axisY = 0;
        this.time = 0;
        this.tempX = 0;
        this.tempY = 0;
    }

    movePerTime(bossPosX, bossPosY, playerPosX, playerPosY) {
        /* 시간 재설정 */
        if(this.time > 200){
            this.time = 0;
        }
        /* 보스 위치로 복귀 */
        if (this.time>130){
            this.resetSetting(bossPosX, bossPosY);
        }
        /* 저장 위치로 이동 */
        if (this.time < 130 && this.time >= 100 ){
            this.move();
            push();
            fill(230,0,0);
            rect(this.tempX-5, this.tempY-5, 10, 10);
            pop();
        }
        /* 플레이어 까지의 거리 저장 */
        if(this.time == 99){
            this.axisSetting(bossPosX, bossPosY, playerPosX, playerPosY);
        }
        /* 보스 위치로 설정, 플레이어 위치 설정 */
        if (this.time > 0 && this.time < 100){
            this.resetSetting(bossPosX, bossPosY);
            this.tempSetting(playerPosX, playerPosY)
            push();
            fill(0,0,255);
            if (this.time % 20 > 9 ) fill(255,0,0);
            rect(this.tempX-5, this.tempY-5, 10, 10);   // 플레이어 위치 표시
            pop();
        }
        this.time++;
    }

    /* 저장 값 (당시 플레이어 위치) 로 이동 함수 */
    move() {
        this.x += this.axisX  / 30;
        this.y += this.axisY  / 30;
    }

    /* 보스 위치로 이동 함수 */
    resetSetting(bossPosX, bossPosY) {
        this.x = bossPosX;
        this.y = bossPosY;
    }

    /* 플레이어까지의 거리 측정 함수 */
    axisSetting(bossPosX, bossPosY, playerPosX, playerPosY){
        this.axisX = playerPosX - bossPosX;
        this.axisY = playerPosY - bossPosY;
    }

    /* 디스플레이 함수 */
    display(){
        push();
        translate(this.x, this.y);
        fill(0);
        rect(-0.5,-4,1,8);
        pop();
    }

    /* 임시 값 설정 함수 */
    tempSetting(tempX, tempY){
        this.tempX = tempX;
        this.tempY = tempY;
    }
}