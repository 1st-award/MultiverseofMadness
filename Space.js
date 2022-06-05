class Space {
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
