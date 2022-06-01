var mode;
var score = 0;
let hitDelay = 0;
let flightShootDelay = 0;
let countShoot = 0;
let flight;
let enemy;
let enemyBullet = [];
let flightShoot = [];
let cloude1 =[];
let cloude2 =[];
let cloude3 =[];
let skyeimg;
const SPACEBAR = 32;
const MODE_GAME_TITLE = 0;
const MODE_IN_GAME = 1;
const MODE_GAME_OVER = 2;
const ENEMY_DIE = 0;
const ENEMY_SURVIVE = 1;
const MODE_GAME_WIN = 3;


function preload() {
  skyeimg = loadImage('resources/skye.png');
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

    if (keyCode === ENTER) {
        mode = MODE_IN_GAME;
        flight.life = 5;
        flight.x = 0;
        flight.y = 0;
        enemy.life = 10;
        enemy.state = ENEMY_SURVIVE;
        score = 0;
        enemy.x = 0;
        enemy.y = -180;
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
    
        /* 스페이스 바를 누를 시 총알이 발사 */
        if (keyIsDown(SPACEBAR)) {
            if (flightShootDelay <= 0) {
                flightShootDelay = 30;
                flightShoot[countShoot % 10].x = flight.x;
                flightShoot[countShoot % 10].y = flight.y;
                countShoot++;
            }
        }

        /* 적이 살아 있을 시 */
        if (enemy.state != 0) {
            for (let j = 0; j < 200; j++) {
                enemyBullet[j].delay = j;
                enemyBullet[j].movePerTime();
                enemyBullet[j].display();
                flight.flightHitBox(enemyBullet[j]);
            }
            enemy.display();
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
            enemy.enemyHitBox(flightShoot[i]);
            if(enemy.isEnemyDead() == true){
                mode = MODE_GAME_WIN;
            }
        }

        /* delay 감소 */
        flightShootDelay--;
        hitDelay--;
    }
}
