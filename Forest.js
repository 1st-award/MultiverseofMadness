class Forest {
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