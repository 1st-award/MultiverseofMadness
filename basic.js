// Player
let flightShootDelayCount = 0;
let flightBombDelayCount = 0;
let countShoot = 0;
let flight;
let flightShoot = [];
const PLAYER_SHOOT_DELAY = 30;
let playerHPImage;
let playerDamageImage;
let playerBombImage;
// Enemy
var bossLevel = 0;
let enemy;
let birdBoss = [];
let enemyBullet = [];
let enemyMissile = [];
let bossSun;
const bossBirdLevel = 0;
const bossHelicopterLevel = 1;
const bossSunLevel = 2;
//Background
let leftForestArray = [];
let rightForestArray = [];
let forestimg;
let treeimg;
let leftCloudArray = [];
let midCloudArray = [];
let rightCloudArray = [];
let skyeimg;
let space = [];
let spaceimg;
const CLOUD_POSY_LIMIT = 1000;
// Item
let countItemEffectTime = -1;
let enemyBulletStop = false;
const ITEM_SPEED_UP = 0;
const ITEM_DAMAGE_UP = 1;
const ITEM_BULLET_STOP = 2;
// Game
var mode;
var score = 0;
var time = 0;
const SPACEBAR = 32;
const MODE_GAME_TITLE = 0;
const MODE_IN_GAME = 1;
const MODE_GAME_OVER = 2;
const MODE_SCORE_BOARD = 3;
const ENEMY_DIE = 0;
const ENEMY_SURVIVE = 1;
const MODE_GAME_WIN = 4;
const MODE_INPUT_PLAYERNAME = 5;
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
// BossImage
let birdPoseAImage;
let birdPoseBImage;
let helicopterImage;
let helicopterPropellerImage;
let sunPoseAImage;
let sunPoseBImage;
let yellowMeteoImage;
let redMeteoImage;
// Font
let font;
// ScoreBoard
let scoreRegistration = false;
let refreshScoreBoard = false;
let rankingList = [];
let skipRankingCount = 0;
let nextRankingPrintCount = 0;
let connectionStatus;
let nickname = [];
let nicknameTemp = [];

function preload() {
    /* 리소스 로드 */
    // Background Resource
    skyeimg = loadImage('resources/skye.png');
    forestimg = loadImage('resources/forest.png');
    treeimg = loadImage('resources/tree1.png');
    spaceimg = loadImage('resources/space.png');
    titleBackground = loadImage('resources/bg.png');
    //-----------------------------------------------------------------------------------------------------------------
    // UI Resource
    buttonEmptyImage = loadImage('resources/bt_empty.png');
    buttonQuitImage = loadImage('resources/bt_quit.png');
    buttonStartImage = loadImage('resources/bt_start.png');
    buttonTitleImage = loadImage('resources/bt_totitle.png');
    textGameOverImage = loadImage('resources/tex_gameover.png');
    textScoreImage = loadImage('resources/tex_score.png');
    textTitleImage = loadImage('resources/tex_title.png');
    textUserNameImage = loadImage('resources/tex_username.png');
    textVictoryImage = loadImage('resources/tex_victory.png');
    //-----------------------------------------------------------------------------------------------------------------
    // Player Resource
    playerHPImage = loadImage('resources/hp.png');
    playerDamageImage = loadImage('resources/damage.png');
    playerBombImage = loadImage('resources/boom.png');
    //-----------------------------------------------------------------------------------------------------------------
    // Boss Resource
    birdPoseAImage = loadImage('resources/bird1.png');
    birdPoseBImage = loadImage('resources/bird2.png');
    helicopterImage = loadImage('resources/helicopter.png');
    helicopterPropellerImage = loadImage('resources/helicopterpropeller.png');
    sunPoseAImage = loadImage('resources/sun1.png');
    sunPoseBImage = loadImage('resources/sun2.png');
    yellowMeteoImage = loadImage('resources/yellowmeteo.png');
    redMeteoImage = loadImage('resources/redmeteo.png');
    //-----------------------------------------------------------------------------------------------------------------
    // Font Resource
    font = loadFont('resources/DungGeunMo.ttf');
    //-----------------------------------------------------------------------------------------------------------------
}


function setup() {
    mode = MODE_INPUT_PLAYERNAME; //initialy the game has not started
    background(127);
    createCanvas(800, 800, WEBGL);
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

    //새 보스 배경
    for (let i = 0; i < 65; i++) {
        // 왼쪽 숲 생성
        leftForestArray[i] = new Forest(createVector(70, 90), -2000 + 40 * i, createVector(-400, -600), 36);
        // 오른쪽 숲 생성
        rightForestArray[i] = new Forest(createVector(-180, -200), -2000 + 40 * i, createVector(-700, -900), 24);
    }

    //비행기 보스 배경
    for (let i = 0; i < 10; i++) {
        // 왼쪽 구름
        leftCloudArray[i] = new BackgroundCloud(createVector(60, 190), createVector(-400, -550), 8);
        leftCloudArray[i].setTranslate();
        // 가운데 구름
        midCloudArray[i] = new BackgroundCloud(createVector(-250, 0), createVector(-300, -500), 8);
        // 오른쪽 구름
        rightCloudArray[i] = new BackgroundCloud(createVector(0, 100), createVector(-400, -500), 3);
        rightCloudArray[i].setTranslate();
    }

    //썬 보스 배경
    for (let i = 0; i < 10; i++) {
        space[i] = new Space();
    }
}


function draw() {
    clear();
    translate(0, 0, 100);
    /* 닉네임 입력 */
    if (mode == MODE_INPUT_PLAYERNAME) {
        textFont(font);
        background(255);
        fill(0);
        textSize(40);
        text('input nickname', -100, -200);
        text(nickname, -200, -100);
    }
    /* 타이틀 */
    if (mode == MODE_GAME_TITLE) {
        image(titleBackground, -width / 2, -height / 2, width, height);
        push();
        fill(255, 0, 0);
        if (titleState == 0) rect(-100, 50, 200, 50);
        if (titleState == 1) rect(-100, 120, 200, 50);
        if (titleState == 2) rect(-100, 190, 200, 50);
        pop();
        image(textTitleImage, -100, -200, 200, 200);
        image(buttonStartImage, -100, 50, 200, 50);
        image(buttonEmptyImage, -100, 120, 200, 50);
        image(buttonQuitImage, -100, 190, 200, 50);
        score = 0;
        time = 0;
        bossLevel = 0;
    }

    /* 게임 오버 */
    if (mode == MODE_GAME_OVER) {
        background(127);
        bossLevel = 0;
    }
    /* 게임 승리 */
    if (mode == MODE_GAME_WIN) {
        background(255)
        textFont(font);
        if (scoreRegistration == false) {
            score += bossLevel * 10000;
            scoreRegistration = true;
        }
        fill(0);
        text('nickname', -100, -200);
        text(nickname, -200, -200);
        text('score', -100, -100);
        text(score, -200, -100);
        text('time', -100, 0);
        text(time, -200, 0);
    }

    if (mode == MODE_SCORE_BOARD) {
        image(titleBackground, -width / 2, -height / 2, width, height);
        drawScoreBoard();
    }

    /* 인 게임 */
    if (mode == MODE_IN_GAME) {
        score++;
        time++;
        background(80, 188, 223);

        if (bossLevel == 0) {
            if (birdBoss[0].state == ENEMY_SURVIVE || birdBoss[1].state == ENEMY_SURVIVE || birdBoss[2].state == ENEMY_SURVIVE) {
                drawForestBackground();
                for (let i = 0; i < 3; i++) {
                    if (birdBoss[i].state == ENEMY_SURVIVE) {
                        birdBoss[i].behavior(flight.x, flight.y);
                        birdBoss[i].display(flight.x, flight.y);
                        flight.flightHitBox(birdBoss[i], 20, 60);
                        birdBoss[i].displayBossHP(-300 + 190 * i, -340, 160, 40);
                    }
                }
            } else {
                bossLevel = 1;
                enemy = new EnemyShooter(0, -200, 1, 20, 100, helicopterImage, helicopterPropellerImage);
                for (let i = 0; i < 200; i++) {
                    enemyBullet[i].x = 10000;
                    enemyBullet[i].y = 0;
                }
                for (let i = 0; i < 2; i++) {
                    enemyMissile[i] = new EnemyMissile();
                }

                for (let i = 0; i < 10; i++) {
                    flightShoot[i].x = 10000;
                    flightShoot[i].y = 0;
                }

                flightShootDelay = 0;
            }
        }

        if (bossLevel == 1) {
            /* 적이 살아 있을 시 */
            if (enemy.state == ENEMY_SURVIVE) {
                drawSkyBackground();
                enemy.behavior();
                enemy.display();
                flight.flightHitBox(enemy, 20, 60);
                if (flightBombDelayCount < 0) {
                    for (let j = 0; j < 200; j += 2) {
                        if (enemyBulletStop == false) {
                            enemyBullet[j].delay = j;
                            enemyBullet[j].movePerTime(enemy.x - 12, enemy.y + 23, 2);
                            enemyBullet[j + 1].delay = j + 1;
                            enemyBullet[j + 1].movePerTime(enemy.x + 17, enemy.y + 23, 2);
                        }
                        enemyBullet[j].display();
                        enemyBullet[j + 1].display();
                        flight.flightHitBox(enemyBullet[j], 4, 60);
                    }
                    if (enemyBulletStop == false) {
                        enemyMissile[0].movePerTime(enemy.x - 7, enemy.y + 25, flight.x, flight.y);
                        flight.flightHitBox(enemyMissile[0], 4, 60);
                        enemyMissile[1].movePerTime(enemy.x + 11, enemy.y + 25, flight.x, flight.y);
                        flight.flightHitBox(enemyMissile[1], 4, 60);
                    }
                    enemyMissile[0].display();
                    enemyMissile[1].display();
                }
                enemy.displayBossHP(-300, -340, 590, 40);
            } else {
                bossLevel = 2;

                bossSun = new BossSun(0, -400, 1, 100, 600, sunPoseAImage, sunPoseBImage);

                for (let i = 0; i < 10; i++) {
                    flightShoot[i].x = 10000;
                    flightShoot[i].y = 0;
                }

                flightShootDelay = 0;
            }
        }
        if (bossLevel == 2) {
            if (bossSun.state == ENEMY_SURVIVE) {
                drawSpaceBackground();
                bossSun.behavior(flight.x, flight.y);
                bossSun.display();
                flight.flightHitBox(bossSun, 20, 60);
                bossSun.displayBossHP(-300, -340, 590, 40);
                for (let i = 0; i < 200; i++) {
                    bossSun.patternAObject[i].display();
                    flight.flightHitBox(bossSun.patternAObject[i], 20, 60);
                }
                for (let i = 0; i < 50; i++) {
                    bossSun.patternBLeftObject[i].display();
                    bossSun.patternBRightObject[i].display();
                    flight.flightHitBox(bossSun.patternBLeftObject[i], 20, 60);
                    flight.flightHitBox(bossSun.patternBRightObject[i], 20, 60);
                }
            } else {
                mode = MODE_GAME_WIN;
            }
        }

        /* 비행기 */
        if (flight.isFlightDead()) {
            mode = MODE_GAME_OVER;
        }
        flight.display();
        flight.displayStat(-300, 300, 160, 40, flight.life, playerHPImage);
        flight.displayStat(-110, 300, 160, 40, flight.damage, playerDamageImage);
        flight.displayStat(80, 300, 160, 40, flight.bombNumber, playerBombImage);

        /* 비행기 총알 출력 */
        for (let i = 0; i < 10; i++) {
            flightShoot[i].move();
            flightShoot[i].display();
            if (bossLevel == 0) {
                for (let j = 0; j < 3; j++) {
                    birdBoss[j].hitBox(flightShoot[i], flight.damage);
                }
            }
            if (bossLevel == 1) {
                enemy.hitBox(flightShoot[i], flight.damage);
            }
            if (bossLevel == 2) {
                bossSun.hitBox(flightShoot[i], flight.damage);
            }
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
    if (countItemEffectTime == 0) {
        this.resetPlayerStatus();
        countItemEffectTime = -1;
    } else if (countItemEffectTime > 0) {
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
    if (mode == MODE_INPUT_PLAYERNAME) {
        if (keyCode === ENTER || keyCode === BACKSPACE) {
            if (keyCode === BACKSPACE) {
                shorten(nicknameTemp);
                nickname = [];
                for (let i = 0; i < nicknameTemp.length; i++) {
                    nickname = nickname + nicknameTemp[i];
                }
            }
            if (keyCode === ENTER) {
                mode = MODE_GAME_TITLE;
            }

        } else {
            append(nicknameTemp, key);
            nickname = [];
            for (let i = 0; i < nicknameTemp.length; i++) {
                nickname = nickname + nicknameTemp[i];
            }
        }
        keyCode = 0;
    }
    if (mode == MODE_GAME_TITLE) {
        if (keyCode === UP_ARROW) {
            titleState = (titleState + 2) % 3;
        }
        if (keyCode === DOWN_ARROW) {
            titleState = (titleState + 1) % 3;
        }
        if (keyCode === ENTER) {
            if (titleState == 0) {
                mode = MODE_IN_GAME;
            }
            if (titleState == 1) {
                mode = MODE_SCORE_BOARD;
                keyCode = 0;
            }
        }
    }
    if (mode == MODE_IN_GAME) {
        if (keyCode === ENTER) {
            resetting();
            keyCode = 0;
        }
    }
    if (mode == MODE_GAME_OVER) {
        if (keyCode === ENTER) {
            resetting();
            bossLevel = 0;
            keyCode = 0;
        }
    }
    if (mode == MODE_SCORE_BOARD) {
        if (keyCode === ENTER) {
            mode = MODE_GAME_TITLE;
            keyCode = 0;
        }
    }

    if (mode == MODE_GAME_WIN) {
        if (keyCode === ENTER) {
            postRanking(nickname, score, time);
            mode = MODE_GAME_TITLE;
            scoreRegistration = false;
            keyCode = 0;
        }
    }
}

function resetting() {
    mode = MODE_IN_GAME;
    flight = new Flight();
    if (bossLevel == 0) {
        for (let i = 0; i < 3; i++) {
            birdBoss[i] = new BirdBoss(0, -200, 1, 5, 80 + 30 * i, birdPoseAImage, birdPoseBImage);
        }
    }
    if (bossLevel == 1) {
        enemy = new EnemyShooter(0, -200, 1, 20, 100, helicopterImage, helicopterPropellerImage);
        for (let i = 0; i < 200; i++) {
            enemyBullet[i].x = 10000;
            enemyBullet[i].y = 0;
        }
        for (let i = 0; i < 2; i++) {
            enemyMissile[i] = new EnemyMissile();
        }
    }
    if (bossLevel == 2) {
        bossSun = new BossSun(0, -400, 1, 100, 600, sunPoseAImage, sunPoseBImage);
    }

    flightShootDelay = 0;

    for (let i = 0; i < 10; i++) {
        flightShoot[i].x = 10000;
        flightShoot[i].y = 0;
    }
}

function drawScoreBoard() {
    textFont(font);
    textSize(50);
    text("이름", -250, -200);
    text("점수", -45, -200);
    text("시간", 150, -200);

    if (nextRankingPrintCount > 10 * 60) {
        skipRankingCount += 10;
        nextRankingPrintCount = 0;
        refreshScoreBoard = false;
    }

    if (refreshScoreBoard != true) {
        refreshScoreBoard = true;
        getRankingBoard(skipRankingCount);
    }

    for (let i = 0; i < rankingList.length; ++i) {
        text(rankingList[i].nickname, -250, i * 45 - 140);
        text(rankingList[i].score, -50, i * 45 - 140);
        text(rankingList[i].time, 150, i * 45 - 140);
    }

    nextRankingPrintCount++;
}

function drawSkyBackground() {
    /* 비행기 보스 배경 출력 함수 */
    image(skyeimg, -300, -300);
    for (let i = 0; i < 10; i++) {
        leftCloudArray[i].display();
        midCloudArray[i].display();
        rightCloudArray[i].display();
    }
}

function drawForestBackground() {
    /* 새 보스 배경 출력 함수 */
    image(forestimg, -350, -350);
    for (let i = 0; i < 65; i++) {
        leftForestArray[i].display();
        rightForestArray[i].display();
    }
}

function drawSpaceBackground() {
    //썬 보스 배경
    push();
    translate(0, 0, -200);
    image(spaceimg, -550, -550, 1100, 1100);
    for (let i = 0; i < 10; i++) {
        space[i].display();
        space[i].x -= 5;
        space[i].y += 5;
        if (space[i].x < -300) {
            space[i].x = random(300, 500);
            space[i].y = random(-700, 0);
        }
    }
    pop();
}
