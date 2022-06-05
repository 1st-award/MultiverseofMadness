class Flight {
    constructor() {
        this.life = 5;
        this.x = 0;
        this.y = 0;
        this.speed = 3;
        this.damage = 20;
        this.bombNumber = 3;
        this.hitDelay = 0;
    }

    display() {
        push();
        translate(this.x, this.y);
        this.flightShape();
        pop();
    }


    flightShape() {
        /* 비행기 키보드 이동 및 생성 함수 */
        this.flightKeyPressed();

        fill(125);
        if(this.hitDelay > 0) fill(255,0,0);
        triangle(-5, 2, 0, -3, 5, 2);
        triangle(-5, 2, -2.5, 2, -3.75, 3.75);
        fill(0);
        triangle(-2.5, 2, 0, 2, -1.25, 2.75);
        triangle(0, 2, 2.5, 2, 1.25, 2.75);
        fill(125);
        if(this.hitDelay > 0) fill(255,0,0);
        triangle(2.5, 2, 5, 2, 3.75, 3.75);
        noFill();
    }


    flightKeyPressed() {
        /* 비행기 및 카메라 조절 함수 */

        if (keyIsDown(UP_ARROW)) {
            this.y -= this.speed;
        }

        if (keyIsDown(DOWN_ARROW)) {
            this.y += this.speed;
        }

        if (keyIsDown(LEFT_ARROW)) {
            rotateY(-PI / 3);
            this.x -= this.speed;
        }

        if (keyIsDown(RIGHT_ARROW)) {
            rotateY(PI / 3);
            this.x += this.speed;
        }

        /* 스페이스 바를 누를 시 총알이 발사 */
        if (keyIsDown(SPACEBAR)) {
            if (flightShootDelayCount <= 0) {
                flightShootDelayCount = PLAYER_SHOOT_DELAY;
                flightShoot[countShoot % 10].x = flight.x;
                flightShoot[countShoot % 10].y = flight.y;
                countShoot++;
            }
        }

        /* 폭탄 사용 시 적의 총알 사라짐 */
        if (keyIsDown(70)) {
            if(flightBombDelayCount <= 0 && this.bombNumber > 0) {
                this.bombNumber -= 1;
                flightBombDelayCount = 180;
                for (let i = 0; i < 200; i++) {
                    enemyBullet[i].x = -500;
                    enemyBullet[i].y = -500;
                }
            }
        }

        this.limitFlightField();
    }


    limitFlightField() {
        /* 비행기가 움직일 수 있는 범위를 제한합니다 */
        var limitX = 295;
        var limitY = 295;

        if (this.x > limitX) {
            this.x = limitX;
        } else if (this.x < -limitX) {
            this.x = -limitX;
        }

        if (this.y > limitY) {
            this.y = limitY;
        } else if (this.y < -limitY) {
            this.y = -limitY;
        }
    }

    flightHitBox(enemyBullet, range, hitDelay) {
        if (abs(enemyBullet.x - this.x) < range && abs(enemyBullet.y - this.y) < range) {
            if (this.hitDelay < 0) {
                this.hitDelay = hitDelay;
                flight.life--;
            }
        }
    }

    isFlightDead(){
        if(this.life <= 0){
            return true;
        }
    }

    displayStat(posX, posY, width, height, value, imageA){
        image(imageA, posX, posY, height, height);
        push();
        fill(255,0,0);
        rect(posX+height,posY,value*(width-height)/5,height);
        noFill();
        stroke(0);
        strokeWeight(4);
        for (let i = 0; i < 5; i++){
            rect(posX+height+i*(width-height)/5,posY,(width-height)/5,height);
        }
        pop();
    }
}
