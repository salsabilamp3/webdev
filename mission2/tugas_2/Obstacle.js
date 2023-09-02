export default class Obstacle {
    constructor(ctx, x, y, width, height, image){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    update(speed, gameSpeed, frameTimeDelta, scaleRatio){
        this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
    }

    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collide(player){
        const adjustBy = 1.4;
        if(
            player.x < this.x + this.width / adjustBy &&
            player.x + player.width / adjustBy > this.x &&
            player.y < this.y + this.height / adjustBy &&
            player.y + player.height / adjustBy > this.y
        ){
            return true;
        } else {
            return false;
        }
    }
}