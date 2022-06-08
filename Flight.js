class Flight {
    constructor() {
        this.life = 5;
        this.x = 0;
        this.y = 0;
        this.speed = 3;
        this.damage = 1;
        this.bombNumber = 3;
        this.flightShootDelayCount = 0;
        this.hitDelay = 0;
        this.state = true;
        this.bullet = [];
        for (let i = 0; i < 10; i++){
            this.bullet[i] = new FlightBullet();
        }
    }

    flightShape() {
        /* 비행기 키보드 이동 및 생성 함수 */
        if(this.state = true) {
            this.flightKeyPressed();
        }

        fill(125);
        if (this.hitDelay > 0) fill(255, 0, 0);
        triangle(-15, 6, 0, -9, 15, 6);
        triangle(-15, 6, -7.5, 6, -3.75 * 3, 3.75 * 3);
        fill(0);
        triangle(-7.5, 6, 0, 6, -3.75, 2.75 * 3);
        triangle(0, 6, 7.5, 6, 3.75, 2.75 * 3);
        fill(125);
        if (this.hitDelay > 0) fill(255, 0, 0);
        triangle(7.5, 6, 15, 6, 3.75 * 3, 3.75 * 3);
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
            if (this.flightShootDelayCount <= 0) {
                lazerSound.setVolume(0.2);
                lazerSound.play();
                this.flightShootDelayCount = PLAYER_SHOOT_DELAY;
                flight.bullet[countShoot % 10].x = flight.x;
                flight.bullet[countShoot % 10].y = flight.y;
                countShoot++;
            }
        }

        /* 폭탄 사용 시 적의 총알 사라짐 */
        if (keyIsDown(70)) {
            if (flightBombDelayCount <= 0 && this.bombNumber > 0) {
                explosionSound.setVolume(0.4);
                explosionSound.play();
                this.bombNumber -= 1;
                flightBombDelayCount = 10;
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
        /* 비행기 히트박스 함수 */
        if (abs(enemyBullet.x - this.x) < range && abs(enemyBullet.y - this.y) < range) {
            if (this.hitDelay < 0 && this.life > 0) {
                tearingSound.setVolume(0.3);
                tearingSound.play();
                this.hitDelay = hitDelay;
                flight.life--;
            }
        }
    }

    isFlightDead() {
        /* 비행기가 죽엇는지 확인하는 함수 */
        if (this.life <= 0) {
            this.life = 0;
            flight.state = false;
            return true;
        }
    }

    resetStatus() {
        /* 아이템 효과 리셋 함수 */
        enemyBulletStop = false;
        this.speed = 3;
    }

    display() {
        /* 비행기 출력하는 함수 */
        push();
        translate(this.x, this.y);
        this.flightShape();
        pop();
    }

    displayStat(posX, posY, width, height, value, imageA) {
        /* 비행기 정보를 출력하는 함수 */
        image(imageA, posX, posY, height, height);
        push();
        fill(255, 0, 0);
        rect(posX + height, posY, value * (width - height) / 5, height);
        noFill();
        stroke(0);
        strokeWeight(4);
        for (let i = 0; i < 5; i++) {
            rect(posX + height + i * (width - height) / 5, posY, (width - height) / 5, height);
        }
        pop();
    }

    resetBullet(){
        for (let i = 0; i < 10; i++){
            this.bullet[i] = new FlightBullet();
        }
    }
}

class FlightBullet {
    /* 유저 총알 */
    constructor() {
        this.x = 0;
        this.y = 0;
        this.speed = 5;
    }

    move() {
        this.y -= this.speed;
    }

    display() {
        push();
        translate(this.x, this.y);
        fill(0, 255, 0);
        box(2);
        pop();
    }
}
