// Player
let flightShootDelayCount = 0;
let flightBombDelayCount = 0;
let countShoot = 0;
let hitDelay = 0;
let flight;
let flightShoot = [];
const PLAYER_SHOOT_DELAY = 30;
// Enemy
let enemy;
let birdBoss;
let enemyBullet = [];
let enemyMissile;
// Item
let countItemEffectTime = -1;
let enemyBulletStop = false;
const ITEM_SPEED_UP = 0;
const ITEM_DAMAGE_UP = 1;
const ITEM_BULLET_STOP = 2;
// Game
var mode;
var score = 0;
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

    let itemVector = createVector(4, 3);
    item = new PlayerItem(itemVector, 255);

    for (let i = 0; i < 10; i++) {
        flightShoot[i] = new FlightShoot();
    }

    for (let i = 0; i < 200; i++) {
        enemyBullet[i] = new EnemyBullet();
    }

    enemyMissile = new EnemyMissile();
}


function draw() {
    clear();
    if (keyCode === ENTER) {
        mode = MODE_IN_GAME;
        flight = new Flight();
        birdBoss = new BirdBoss(0,-200, 0, 10 );
        enemy = new EnemyShooter(0, -200, 1, 10);
        score = 0;
        hitDelay = 0;
        flightShootDelay = 0;

        for (let i = 0; i < 200; i++) {
            enemyBullet[i].x = 10000;
            enemyBullet[i].y = 0;
        }


        for (let i = 0; i < 10; i++) {
            flightShoot[i].x = 10000;
            flightShoot[i].y = 0;
        }
    }

    /* 타이틀 */
    if (mode == MODE_GAME_TITLE) {
        background(0);
    }

    /* 게임 오버 */
    if (mode == MODE_GAME_OVER) {
        background(127);
    }

    /* 게임 승리 */
    if (mode == MODE_GAME_WIN) {
        background(255);
    }

    /* 인 게임 */
    if (mode == MODE_IN_GAME) {
        score++;
        background(80, 188, 223);

        /* 적이 살아 있을 시 */
        if (enemy.state != 0) {
            enemy.behavior(flight.x, flight.y);
            enemy.display();
            if(flightBombDelayCount < 0) {
                for (let j = 0; j < 200; j++) {
                    if (enemyBulletStop == false) {
                        enemyBullet[j].delay = j;
                        enemyBullet[j].movePerTime(enemy.x, enemy.y);
                    }
                    enemyBullet[j].display();
                    flight.flightHitBox(enemyBullet[j]);
                }
                if (enemyBulletStop == false) {
                    enemyMissile.movePerTime(enemy.x, enemy.y, flight.x, flight.y);
                }
                enemyMissile.display();
            }
        }
        if (birdBoss.state != 0){
            birdBoss.behavior(flight.x, flight.y);
            birdBoss.display();
        }
        /* 비행기 */
        if(flight.isFlightDead()){
            mode = MODE_GAME_OVER;
        }
        flight.display();

        /* 비행기 총알 출력 */
        for (let i = 0; i < 10; i++) {
            flightShoot[i].move();
            flightShoot[i].display();
            enemy.hitBox(flightShoot[i], flight.damage);
            birdBoss.hitBox(flightShoot[i], flight.damage);
        }

        /* 비행기와 아이템 상호작용 */
        switch (item.itemListener(flight.x, flight.y)) {
            case ITEM_SPEED_UP:
                flight.speed = 5;
                break;
            case ITEM_DAMAGE_UP:
                flight.damage = 2;
                break;
            case ITEM_BULLET_STOP:
                enemyBulletStop = true;
                break;
        }

        /* 아이템 출력 및 아이템 효과 시간 측정 리스너 */
        item.displayPlayerItem();
        checkItemEffectListener();

        /* delay 감소 */
        flightShootDelayCount--;
        flightBombDelayCount--;
        hitDelay--;
    }
}


function checkItemEffectListener() {
    /* 아이템 효과 시간 체크 함수 */
    if(countItemEffectTime ==0) {
        this.resetPlayerStatus();
        countItemEffectTime = -1;
    }
    else if(countItemEffectTime > 0){
        countItemEffectTime -= 1;
    }
}

function resetPlayerStatus() {
    /* 아이템 효과 리셋 함수 */
    enemyBulletStop = false;
    flight.speed = 3;
    flight.damage = 1;
}
