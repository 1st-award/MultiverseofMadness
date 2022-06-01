// Player
let flightShootDelayCount = 0;
let flightBombDelayCount = 0;
let countShoot = 0;
let flight;
let flightShoot = [];
const PLAYER_SHOOT_DELAY = 30;
// Enemy
let enemy;
let birdBoss;
let enemyBullet = [];
let enemyMissile;
//Background
let cloude1 =[];
let cloude2 =[];
let cloude3 =[];
let skyeimg;
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
// Image
let titleBackground;
let buttonEmptyImage;
let buttonQuitImage;
let buttonStartImage;
let buttonTitleImage;
let textGameOverImage;
let textScoreImage;
let textTitleImage;
let textUserNameImage;
let textVictoryImage;
// Title
let titleState = 0;

function preload() {
  skyeimg = loadImage('resources/skye.png');
  titleBackground = loadImage('resources/bg.png');
  buttonEmptyImage = loadImage('resources/bt_empty.png');
  buttonQuitImage = loadImage('resources/bt_quit.png');
  buttonStartImage = loadImage('resources/bt_start.png');
  buttonTitleImage = loadImage('resources/bt_totitle.png');
  textGameOverImage = loadImage('resources/tex_gameover.png');
  textScoreImage = loadImage('resources/tex_score.png');
  textTitleImage = loadImage('resources/tex_title.png');
  textUserNameImage = loadImage('resources/tex_username.png');
  textVictoryImage = loadImage('resources/tex_victory.png');
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

    //비행기 보스 배경
    for(let i=0;i<10;i++){
        cloude1[i] = new Background_Cloude1();
    }
    for(let i=0;i<10;i++){
        cloude2[i] = new Background_Cloude2();
    }
    for(let i=0;i<10;i++){
        cloude3[i]= new Background_Cloude3();
    }
}


function draw() {
    clear();

    /* 타이틀 */
    if (mode == MODE_GAME_TITLE) {
        image(titleBackground,-300,-300,600,600);
        if(titleState == 0) rect(-100,50,200,50);
        if(titleState == 1) rect(-100,120,200,50);
        if(titleState == 2) rect(-100,190,200,50);
        image(textTitleImage,-100,-200,200,200);
        image(buttonStartImage,-100,50,200,50);
        image(buttonEmptyImage,-100,120,200,50);
        image(buttonQuitImage,-100,190,200,50);
        fill(255, 0, 0);
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

        //배경 이미지 불러오기
        image(skyeimg,-300,-300);

        //비행기 보스 배경
        for(let i=0;i<10;i++){
            cloude1[i].display();
            cloude2[i].display();
            cloude3[i].display();
            push();
            cloude1[i].y += 3;
            if(cloude1[i].y >500){
                cloude1[i].y = random(-400,-550);
            }
            cloude2[i].y += 8;
            if(cloude2[i].y >500){
                cloude2[i].y = random(-400,-600);
            }
            cloude3[i].y += 3;
            if(cloude3[i].y > 500){
                cloude3[i].y = random(-400,-700);
            }
            pop();
        }
        //배경 끝

        /* 적이 살아 있을 시 */
        if (enemy.state != 0) {
            enemy.behavior(flight.x, flight.y);
            enemy.display();
            flight.flightHitBox(enemy, 20, 60);
            if(flightBombDelayCount < 0) {
                for (let j = 0; j < 200; j++) {
                    if (enemyBulletStop == false) {
                        enemyBullet[j].delay = j;
                        enemyBullet[j].movePerTime(enemy.x, enemy.y);
                    }
                    enemyBullet[j].display();
                    flight.flightHitBox(enemyBullet[j], 4, 60);
                }
                if (enemyBulletStop == false) {
                    enemyMissile.movePerTime(enemy.x, enemy.y, flight.x, flight.y);
                    flight.flightHitBox(enemyMissile, 4, 60);
                }
                enemyMissile.display();
            }
        }
        if (birdBoss.state != 0){
            birdBoss.behavior(flight.x, flight.y);
            birdBoss.display();
            flight.flightHitBox(birdBoss, 20, 60);
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
        flight.hitDelay--;
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

function keyPressed() {
    if(mode == MODE_GAME_TITLE) {
        if(keyCode === UP_ARROW){
            titleState = (titleState+2)%3;
            print(titleState);
        }
        if(keyCode === DOWN_ARROW){
            titleState = (titleState+1)%3;
            print(titleState);
        }
        if(keyCode === ENTER){
            if(titleState == 0){
                mode = MODE_IN_GAME;
            }
        }
    }
    if(mode == MODE_IN_GAME){
        if (keyCode === ENTER) {
            mode = MODE_IN_GAME;
            flight = new Flight();
            birdBoss = new BirdBoss(0, -200, 0, 10);
            enemy = new EnemyShooter(0, -200, 1, 10);
            enemyMissile = new EnemyMissile();
            score = 0;
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
    }
}