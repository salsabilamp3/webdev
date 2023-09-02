import Obstacle from './Obstacle.js';

export default class ObsController {
    OBSTACLE_INTERVAL_MIN = 500;
    OBSTACLE_INTERVAL_MAX = 2000;

    nextCactusIn = null;
    obs = [];

    constructor(ctx, obstacleImages, scaleRatio, speed){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.obstacleImages = obstacleImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.setNextObstacleTime();
    }

    setNextObstacleTime(){
        const num = Math.random() * (this.OBSTACLE_INTERVAL_MAX - this.OBSTACLE_INTERVAL_MIN) + this.OBSTACLE_INTERVAL_MIN;
        this.nextObstacleIn = Math.floor(num);
    }

    getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }

    createObstacle(){
        const index = this.getRandomNumber(0, this.obstacleImages.length - 1);
        const obstacleImage = this.obstacleImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - obstacleImage.height;
        const obstacle = new Obstacle(this.ctx, x, y, obstacleImage.width, obstacleImage.height, obstacleImage.image);

        this.obs.push(obstacle);
    }

    update(gameSpeed, frameTimeDelta){
        if(this.nextObstacleIn <= 0){
            this.createObstacle();
            this.setNextObstacleTime();
        }
        this.nextObstacleIn -= frameTimeDelta;

        this.obs.forEach((obstacle)=>{
            obstacle.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
        });

        this.obs = this.obs.filter((obstcale) => obstcale.x > -obstcale.width);
    }

    draw(){
        this.obs.forEach((obstacle)=>{
            obstacle.draw();
        });
    }

    collide(player){
        return this.obs.some((obstacle) => obstacle.collide(player));
    }

    reset(){
        this.obs = [];
    }
}