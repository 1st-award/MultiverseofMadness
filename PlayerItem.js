class PlayerItem {
    constructor(vectorSpeed, colorAlpha) {
        this.initPlayerItem(vectorSpeed, colorAlpha);
    }

    initPlayerItem(vectorSpeed, colorAlpha) {
        this.itemPosition = createVector(0, -250);
        this.itemSpeed = vectorSpeed;
        this.itemRadius = 20;
        this.colorAlpha = colorAlpha;
        this.itemType = int(random(4));
        this.countItemDisplayCoolTime = -1;
        print(this.itemType);
    }

    movePlayerItem() {
        this.itemPosition.x += this.itemSpeed.x;
        this.itemPosition.y += this.itemSpeed.y;
        if ((this.itemPosition.x >= (width/2 - this.itemRadius/2)) || (this.itemPosition.x+width/2 <= this.itemRadius/2)) this.itemSpeed.x *= -1.0;
        if ((this.itemPosition.y >= (height/2 - this.itemRadius/2)) || (this.itemPosition.y+height/2 <= this.itemRadius/2)) this.itemSpeed.y *= -1.0;
    }

    itemListener(flightPosX, flightPosY) {
        if (abs(flightPosX - this.itemPosition.x) < 40 && abs(flightPosY - this.itemPosition.y) < 40) {
            const returnItemEffect = this.itemType;
            this.initPlayerItem(createVector(0, 0), 0);
            this.colorAlpha = 0;
            this.countItemDisplayCoolTime = 300;
            countItemEffectTime = 600;
            return returnItemEffect;
        }
        return -1;
    }


    itemCoolTimeListener() {
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
        this.itemCoolTimeListener();
        this.movePlayerItem();
        push();
        fill(255, 255, 255, this.colorAlpha);
        circle(this.itemPosition.x, this.itemPosition.y, this.itemRadius);
        pop();
    }
}