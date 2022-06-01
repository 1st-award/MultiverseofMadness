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

    enemyHitBox(flightBullet, flightDamage) {
        if (abs(flightBullet.x - this.x) < 40 && flightBullet.y == this.y) {
            enemy.life -= flightDamage;
        }
    }

    isEnemyDead(){
        if (this.life < 0) {
            this.state = ENEMY_DIE;
            return true;
        }
    }
}