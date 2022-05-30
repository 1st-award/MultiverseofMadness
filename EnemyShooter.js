class EnemyShooter {

    /* 적 */

    constructor() {
        this.x = 0;
        this.y = 10;
        this.life = 11;
        this.state = ENEMY_SURVIVE;
    }

    move(value) {
        this.x += sin(value) * 2;
    }

    display() {
        push();
        translate(this.x, this.y, 200);
        this.lifePerColor();
        torus(30);
        pop();
    }

    lifePerColor() {
        if (this.life == 1) {
            fill(0);
            enemy.state = ENEMY_DIE;
            mode = MODE_GAME_WIN;
        }
        if (this.life <= 3 && this.life > 1) {
            if (frameCount % 2 == 1) {
                fill(127);
            }
            if (frameCount % 2 == 0) {
                fill(255);
            }
        }

        if (this.life < 10 && this.life > 3) {
            fill(255, 0, 0);
        }
        if (this.life > 10) {
            fill(255);
        }
    }
}