class BackgroundForest {
    /* 새 보스 뒷 배경 나무와 강 클래스 */
    constructor(forestVectorPosX, posY, forestWaterVectorPosY, forestDistance) {
        this.x = random(forestVectorPosX.x, forestVectorPosX.y);
        this.y = posY;
        this.waterX = random(-80, 80);
        this.waterY = random(forestWaterVectorPosY.x, forestWaterVectorPosY.y);
        this.waterSizeX = random(5, 10);
        this.waterSizeY = random(20, 30);
        this.distance = random(-PI / forestDistance, PI / forestDistance);
        this.speed = 5;
        this.originWaterVector = forestWaterVectorPosY;
    }

    move() {
        /* 숲 움직이게하는 함수 */
        push();
        this.y += this.speed;
        this.waterY += this.speed;

        if(this.y > 600) {
            // 숲 초기화
            this.y = -2000;
        }

        if(this.waterY > 300) {
            // 강 초기화
            this.waterY = random(this.originWaterVector.x, this.originWaterVector.y);
        }
        pop();
    }

    display() {
        /* 숲 출력하는 함수 */
        this.move();
        push();
        translate(this.waterX, this.waterY);
        noStroke();
        fill(0, 150, 200);
        rect(this.waterX, this.waterY, this.waterSizeX, this.waterSizeY);
        pop();
        push();
        translate(this.x, this.y);
        rotateZ(this.distance);
        image(treeimg, this.x, this.y);
        pop();
    }
}

class BackgroundCloud {
    // 헬리콥터 보스 뒷 배경 구름 클래스
    constructor(cloudVectorPosX, cloudVectorPosY, cloudSpeed) {
        this.x = random(cloudVectorPosX.x, cloudVectorPosX.y);
        this.y = random(cloudVectorPosY.x, cloudVectorPosY.y);
        this.size = random(100 ,150);
        this.speed = cloudSpeed;
        this.movePosX = 0;
        this.movePosY = 0;
        this.originVectorPosY = cloudVectorPosY;
    }

    setTranslate() {
        /* 구름을 정중앙에서 이동시키는 함수 */
        this.movePosX = this.x;
        this.movePosY = this.y;
    }

    move() {
        /* 구름을 움직이게하는 함수 */
        push();
        this.y += this.speed;
        if(this.y > CLOUD_POSY_LIMIT) {
            this.y = random(this.originVectorPosY.x, this.originVectorPosY.y);
        }
        pop();
    }

    display() {
        /* 구름 출력 함수 */
        this.move();
        push();
        translate(this.movePosX, this.movePosY);
        noStroke();
        fill(249);
        ellipse(this.x, this.y, this.size, this.size);
        ellipse(this.x + 70, this.y - 20, this.size, this.size);
        ellipse(this.x - 70, this.y - 20, this.size, this.size);
        pop();
    }
}

class BackgroundSpace {
    /* 썬 보스 뒷 배경 우주 클래스 */
    constructor() {
        this.x = random(300, 500);
        this.y = random(-700, 0);
        this.Size = random(10, 30);
        this.speed = 5;
    }

    move() {
        /* 운석 움직이게하는 함수 */
        this.x -= this.speed;
        this.y += this.speed;
        if (this.x < -300) {
            this.x = random(300, 500);
            this.y = random(-700, 0);
        }
    }

    display() {
        /* 우주 출력하는 함수 */
        this.move();
        push();
        translate(this.x, this.y);
        // rotate(PI*10);
        fill(random(200, 255), 0, random(200, 255));
        ellipse(this.x, this.y, this.Size, this.Size);
        pop();
    }
}

