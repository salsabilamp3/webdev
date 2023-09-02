import Player from './Player.js';
import Ground from './Ground.js';
import ObsController from './ObsController.js';
import Score from './Score.js';


const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const GAME_SPEED_START = 0.75;
const GAME_SPEED_INCREASE = 0.00001;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 88 / 1.5;
const PLAYER_HEIGHT = 94 / 1.5;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GROUND_AND_OBSTACLE_SPEED = 0.5;

const OBSTACLE_CONFIG = [
    { width: 98 / 1.5, height: 100 / 1.5, image: "assets/obs-1.png" },
    { width: 98 / 1.5, height: 100 / 1.5, image: "assets/obs-2.png" },
    { width: 68 / 1.5, height: 70 / 1.5, image: "assets/obs-3.png" },
]

let player = null;
let ground = null;
let obsController = null;
let score = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListeners = false;
let waitingToStart = true;

function createPlayer(){
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

    const groundWidthInGame = GROUND_WIDTH * scaleRatio;
    const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

    player = new Player(ctx, playerWidthInGame, playerHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio);

    ground = new Ground(ctx, groundWidthInGame, groundHeightInGame, GROUND_AND_OBSTACLE_SPEED, scaleRatio);

    const obsImages = OBSTACLE_CONFIG.map((config) => {
        const image = new Image();
        image.src = config.image;
        return { width: config.width * scaleRatio, height: config.height * scaleRatio, image: image };
    });

    obsController = new ObsController(ctx, obsImages, scaleRatio, GROUND_AND_OBSTACLE_SPEED);

    score = new Score(ctx, scaleRatio);
}

function setScreen(){
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createPlayer();
}

setScreen();

window.addEventListener('resize', ()=> setTimeout(setScreen, 500));

if(screen.orientation){
    screen.orientation.addEventListener('change', setScreen);
}

function getScaleRatio(){
    const screenHeigth = Math.min(
        window.innerHeight,
        document.documentElement.clientHeight
    );

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
    );

    if(screenWidth / GAME_WIDTH < screenHeigth / GAME_HEIGHT){
        return screenWidth / GAME_WIDTH;
    } else {
        return screenHeigth / GAME_HEIGHT;
    }
    
}

function displayGameOver(){
    const fontSize = 70 * scaleRatio;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = '#1d304a';
    const x = canvas.width / 4.5;
    const y = canvas.height / 2;
    ctx.fillText('GAME OVER', x, y);
}

function setupGameReset(){
    if(!hasAddedEventListeners){
        hasAddedEventListeners = true;

        setTimeout(()=>{
            window.addEventListener('keyup', reset, { once: true});
        }, 1500);
    }
}

function reset(){
    hasAddedEventListeners = false;
    gameOver = false;
    waitingToStart = false;
    ground.reset();
    obsController.reset();
    score.reset();
    gameSpeed = GAME_SPEED_START;
}

function displayStartGame(){
    const fontSize = 40 * scaleRatio;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = '#1d304a';
    const x = canvas.width / 4.5;
    const y = canvas.height / 4;
    ctx.fillText('Press Space to Start', x, y);
}

function updateGameSpeed(frameTimeDelta){
    gameSpeed += GAME_SPEED_INCREASE * frameTimeDelta;
}

function clearScreen(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(currentTime){
    if(previousTime === null){
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }

    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    clearScreen();

    if(!gameOver && !waitingToStart){
        ground.update(gameSpeed, frameTimeDelta);
        obsController.update(gameSpeed, frameTimeDelta);
        player.update(gameSpeed, frameTimeDelta);
        score.update(frameTimeDelta);
        updateGameSpeed(frameTimeDelta);
    }

    if(!gameOver && obsController.collide(player)){
        gameOver = true;
        setupGameReset();
    }
    
    ground.draw();
    player.draw();
    obsController.draw();
    score.draw();

    if(gameOver){
        displayGameOver();
    }

    if(waitingToStart){
        displayStartGame();
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
window.addEventListener('keyup', reset, { once: true});