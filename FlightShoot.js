class FlightShoot {
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
        translate(this.x, this.y, 100);
        fill(0, 255, 0);
        box(2);
        pop();
    }
}