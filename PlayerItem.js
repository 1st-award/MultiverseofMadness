class PlayerItem {
    constructor(vectorSpeed, colorAlpha) {
        this.initPlayerItem(vectorSpeed, colorAlpha);
    }

    initPlayerItem(vectorSpeed, colorAlpha) {
        this.itemPosition = createVector(0, -250);
        this.itemSpeed = vectorSpeed;
        this.itemRadius = 20;
        this.colorAlpha = colorAlpha;
        this.itemType = int(random(3));
        this.colorVector = this.selectColor();
        this.countItemDisplayCoolTime = -1;
    }

    selectColor() {
        switch(this.itemType) {
            case ITEM_SPEED_UP:
                return createVector(255, 0, 0);
            case ITEM_DAMAGE_UP:
                return createVector(0, 255, 0);
            case ITEM_BULLET_STOP:
                return createVector(0, 0, 255);
        }
    }

    movePlayerItem() {
        /* 아이템 이동 함수 */
        this.itemPosition.x += this.itemSpeed.x;
        this.itemPosition.y += this.itemSpeed.y;
        if ((this.itemPosition.x >= (width/2 - this.itemRadius/2)) || (this.itemPosition.x+width/2 <= this.itemRadius/2)) this.itemSpeed.x *= -1.0;
        if ((this.itemPosition.y >= (height/2 - this.itemRadius/2)) || (this.itemPosition.y+height/2 <= this.itemRadius/2)) this.itemSpeed.y *= -1.0;
    }

    itemListener(flightPosX, flightPosY) {
        /* 비행기가 아이템을 먹엇는지 확인하는 함수 */
        if (abs(flightPosX - this.itemPosition.x) < 40 && abs(flightPosY - this.itemPosition.y) < 40) {
            const returnItemEffect = this.itemType;
            this.initPlayerItem(createVector(0, 0), 0);
            this.colorAlpha = 0;
            this.countItemDisplayCoolTime = 400;  // frame time
            countItemEffectTime = 300;
            return returnItemEffect;
        }
        return -1;
    }


    itemCoolTimeListener() {
        /* 아이템을 먹고 다시 화면에 출력하는 시간을 계산하는 함수 */
        if(this.countItemDisplayCoolTime > 0) {
            this.countItemDisplayCoolTime -= 1;
        }
        if(this.countItemDisplayCoolTime == 0) {
            this.itemSpeed = createVector(4, 5);
            this.colorAlpha = 255;
            this.countItemDisplayCoolTime -= 1;
        }
    }

    displayPlayerItem() {
        /* 아이템 출력 함수 */
        this.itemCoolTimeListener();
        this.movePlayerItem();
        push();
        fill(this.colorVector.x, this.colorVector.y, this.colorVector.z, this.colorAlpha);
        circle(this.itemPosition.x, this.itemPosition.y, this.itemRadius);
        pop();
    }
}