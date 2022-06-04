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
        this.pattern();
        if(this.attackDelay < 300 && this.attackDelay >= 200){
            this.patternA(this.attackDelay-200);
            this.patternA(this.attackDelay-100);
        }
        else{
            this.patternAState = 0;
        }
        if(this.attackDelay <= 100 && this.attackDelay % 10 == 9){
            this.tempSetting(playerPosX, playerPosY + random(-10, -5));
            this.temp = (this.attackDelay-1)/2;

        }
        if(this.attackDelay < 100 && this.attackDelay % 2 == 0){
            this.patternB(this.attackDelay/2);
        }
        else{
            this.patternBState = 0;
        }
        if(this.attackDelay < 0){
            this.attackDelay = 400;
        }
        if(this.attackDelay < 300 && this.attackDelay > 0) {
            for (let i = 0; i < 200; i++) {
                this.patternAObject[i].move();
            }
        }
        if(this.attackDelay < 100 || this.attackDelay > 300){
            for(let i = 0; i < 50; i++) {
                this.patternBLeftObject[i].move();
                this.patternBRightObject[i].move();
            }
        }
        this.attackDelay--;
        super.isEnemyDead();
    }

    display(){
        push();
        translate(this.x, this.y);
        if(this.patternAState == 1) rotateZ(frameCount/20);
        if(this.patternBState == 1) rotateZ(frameCount/10);
        if(frameCount%100 > 50) image(this.img1,-300,-300,600,600);
        else image(this.img2,-300,-300,600,600);
        pop();
    }

    pattern(){
        let tempX = this.x - flight.x;
        let tempY = this.y - flight.y;
        flight.x += tempX / sqrt(sq(tempX) + sq(tempY));
        flight.y += tempY / sqrt(sq(tempX) + sq(tempY));
    }

    patternA(i){
        this.patternAState = 1;
        this.patternAObject[i].resetSetting(this.x, this.y);
    }

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