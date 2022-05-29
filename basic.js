var mode;
var score = 0;
let hitDelay = 0;
let flightShootDelay = 0;
let countShoot = 0;
let flight;
let enemy;
let enemyBullet = [];
let flightShoot = [];
const SPACEBAR = 32;
const MODE_GAME_TITLE = 0;
const MODE_IN_GAME = 1;
const MODE_GAME_OVER = 2;
const ENEMY_DIE = 0;
const ENEMY_SURVIVE = 1;
const MODE_GAME_WIN = 3;

function preload() {

}

function setup() {
    mode = MODE_GAME_TITLE; //initialy the game has not started
    background(127);
    createCanvas(600, 600, WEBGL);
    noStroke();
    flight = new Flight();
    enemy = new EnemyShooter();
    for (let i = 0; i < 10; i++) {
        flightShoot[i] = new FlightShoot();
    }
    for (let i = 0; i < 200; i++) {
        enemyBullet[i] = new EnemyBullet();
    }
}

function draw() {
    clear();
    if (keyCode === ENTER) {
        mode = MODE_IN_GAME;
        flight.x = 0;
        flight.y = 0;
        enemy.life = 10;
        enemy.state = ENEMY_SURVIVE;
        score = 0;
        enemy.x = 0;
        enemy.y = -180;
        for (let i = 0; i < 200; i++) {
            enemyBullet[i].x = 10000;
            enemyBullet[i].y = 0;
        }
        for (let i = 0; i < 10; i++) {
            flightShoot[i].x = 10000;
            flightShoot[i].y = 0;
        }
    }
    if (mode == MODE_GAME_TITLE) {
        background(0);
    }
    if (mode == MODE_GAME_OVER) {
        background(127);
    }
    if (mode == MODE_GAME_WIN){
        background(255);
    }
    if (mode == MODE_IN_GAME) {
        score++;
        background(80, 188, 223);
        /* 적이 살아 있을 시 */
        if (enemy.state != 0) {
            for (let j = 0; j < 200; j++) {
                enemyBullet[j].delay = j;
                enemyBullet[j].move();
                enemyBullet[j].display();
            }
            enemy.display();
        }
        /* 스페이스 바를 누를 시 총알이 발사 */
        if (keyIsDown(SPACEBAR)) {
            if (flightShootDelay <= 0) {
                flightShootDelay = 30;
                flightShoot[countShoot % 10].x = flight.x;
                flightShoot[countShoot % 10].y = flight.y;
                countShoot++;
            }
        }
        flight.display();
        /* 총알 출력 */
        for (let i = 0; i < 10; i++) {
            flightShoot[i].display();
        }
        flightShootDelay--;
        hitDelay--;
        /* 비행기 위치 이동 translate */
    }
}

class Flight{
    constructor() {
        this.life = 5;
        this.x = 0;
        this.y = 0;
    }

    display() {
        push();
        translate(this.x, this.y, 200);
        this.flightShape();
        pop();
    }

    flightShape() {
        /* 비행기 키보드 이동 및 생성 함수 */
        this.flightKeyPressed();

        fill(125);
        triangle(-5, 2, 0, -3, 5, 2);
        triangle(-5, 2, -2.5, 2, -3.75, 3.75);
        fill(0);
        triangle(-2.5, 2, 0, 2, -1.25, 2.75);
        triangle(0, 2, 2.5, 2, 1.25, 2.75);
        fill(125);
        triangle(2.5, 2, 5, 2, 3.75, 3.75);
        noFill();
    }

    flightKeyPressed() {
        /* 비행기 및 카메라 조절 함수 */
        if (keyIsDown(UP_ARROW)) {
            this.y -= 3;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.y += 3;
        }
        if (keyIsDown(LEFT_ARROW)) {
            rotateY(-PI / 3);
            this.x -= 3;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            rotateY(PI / 3);
            this.x += 3;
        }
        this.limitFlightField();
    }

    limitFlightField() {
        /* 비행기가 움직일 수 있는 범위를 제한합니다 */
        var limitX = 180;
        var limitY = 130;
        if (this.x > limitX) {
            this.x = limitX;
        } else if (this.x < -limitX) {
            this.x = -limitX;
        }
        if (this.y > limitY) {
            this.y = limitY;
        } else if (this.y < -limitY) {
            this.y = -limitY;
        }
    }
}

class FlightShoot {
    /* 유저 총알 */
    constructor() {
        this.x = 0;
        this.y = 0;
        this.speed = 5;
    }

    display() {
        push();
        translate(this.x, this.y, 200);
        if (abs(this.x - enemy.x ) < 40 && this.y == enemy.y) {
            enemy.life--;
        }
        this.y -= this.speed;
        fill(0, 255, 0);
        box(2);
        pop();
    }
}

class EnemyBullet {
    /* 적 총알 */
    constructor() {
        this.x = 0;
        this.y = -170;
        this.axisX = random(-50, 50);
        this.axisY = random(0, 100);
        this.speed = 10;
        this.time = 0;
        this.delay = 0;
    }

    move() {
        if (this.time > this.delay) {
            this.x += this.axisX/10;
            this.y += this.axisY/10;
        }
        this.time++;
    }

    display() {
        push();
        translate(this.x, this.y, 200);
        if (abs(this.x - flight.x) < 4 && abs(this.y - flight.y) < 4) {
            if(hitDelay < 0){
                hitDelay = 60;
                flight.life--;
            }
            if(flight.life < 0){
                mode = MODE_GAME_OVER;
            }
        }
        if (this.time > 200 + this.delay) {
            this.x = 0;
            this.y = -170;
            this.time = 0;
            this.axisX = random(-50, 50);
            this.axisY = random(0, 100);
        }
        fill(255, 255, 0);
        sphere(4);
        pop();
    }
}

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
        torus(30);
        pop();
    }
}