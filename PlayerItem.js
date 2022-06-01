class PlayerItem {
    constructor() {
        this.initPlayerItem();
    }

    initPlayerItem() {
        this.itemPosition = createVector(0, -250);
        this.itemSpeed = createVector(4, 3);
        this.itemRadius = 20;
        this.colorAlpha = 255;
    }

    movePlayerItem() {
        this.itemPosition.x += this.itemSpeed.x;
        this.itemPosition.y += this.itemSpeed.y;
        if ((this.itemPosition.x >= (width/2 - this.itemRadius/2)) || (this.itemPosition.x+width/2 <= this.itemRadius/2)) this.itemSpeed.x *= -1.0;
        if ((this.itemPosition.y >= (height/2 - this.itemRadius/2)) || (this.itemPosition.y+height/2 <= this.itemRadius/2)) this.itemSpeed.y *= -1.0;
    }

    itemListener(flightPosX, flightPosY) {
        if (abs(flightPosX - this.itemPosition.x) < 40 && abs(flightPosY - this.itemPosition.y) < 40) {
            this.colorAlpha = 0;
            return true;
        }
        return false;
    }

    displayPlayerItem() {
        this.movePlayerItem();
        push();
        fill(255, 255, 255, this.colorAlpha);
        circle(this.itemPosition.x, this.itemPosition.y, this.itemRadius);
        pop();
    }
}