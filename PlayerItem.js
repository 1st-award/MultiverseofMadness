class PlayerItem {
    constructor(vectorSpeed, enable) {
        this.initPlayerItem(vectorSpeed, enable);
    }

    initPlayerItem(vectorSpeed, enable) {
        this.itemPosition = createVector(0, -350);
        this.itemSpeed = vectorSpeed;
        this.itemRadius = 20;
        this.itemType = int(random(5));
        this.texture = this.selectTexture();
        this.countItemDisplayCoolTime = -1;
        this.enable = enable;
    }

    selectTexture() {
        switch (this.itemType) {
            case ITEM_SPEED_UP:
                return speedUpImage;
            case ITEM_DAMAGE_UP:
                return swordImage;
            case ITEM_BULLET_STOP:
                return sandClockImage;
            case ITEM_GET_BOMB:
                return playerBombImage;
            case ITEM_GET_LIFE:
                return playerHPImage;
        }
    }

    movePlayerItem() {
        /* 아이템 이동 함수 */
        this.itemPosition.x += this.itemSpeed.x;
        this.itemPosition.y += this.itemSpeed.y;
        if ((this.itemPosition.x >= (width / 2 - this.itemRadius / 2)) || (this.itemPosition.x + width / 2 <= this.itemRadius / 2)) this.itemSpeed.x *= -1.0;
        if ((this.itemPosition.y >= (height / 2 - this.itemRadius / 2)) || (this.itemPosition.y + height / 2 <= this.itemRadius / 2)) this.itemSpeed.y *= -1.0;
    }

    itemListener(flightPosX, flightPosY) {
        /* 비행기가 아이템을 먹엇는지 확인하는 함수 */
        if (abs(flightPosX - this.itemPosition.x) < 40 && abs(flightPosY - this.itemPosition.y) < 40 && flight.state != false) {
            const returnItemEffect = this.itemType;
            this.initPlayerItem(createVector(0, 0), false);
            this.countItemDisplayCoolTime = 400;  // frame time
            countItemEffectTime = 300;
            return returnItemEffect;
        }
        return -1;
    }


    itemCoolTimeListener() {
        /* 아이템을 먹고 다시 화면에 출력하는 시간을 계산하는 함수 */
        if (this.countItemDisplayCoolTime > 0) {
            this.countItemDisplayCoolTime -= 1;
        }
        if (this.countItemDisplayCoolTime == 0) {
            this.itemSpeed = createVector(4, 5);
            this.enable = true;
            this.countItemDisplayCoolTime -= 1;
        }
    }

    displayPlayerItem() {
        /* 아이템 출력 함수 */
        this.itemCoolTimeListener();
        this.movePlayerItem();
        if(this.enable)
            image(this.texture, this.itemPosition.x, this.itemPosition.y, 42, 42);
    }
}