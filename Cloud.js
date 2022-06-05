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
