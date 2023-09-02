export default class Player{
    WALK_ANIMATION_TIMER = 200;
    walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    catRunImages = [];

    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    JUMP_SPEED = 0.6;
    GRAVITY = 0.4;

    constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio){
        this.ctx = ctx;
        this.canvas = ctx.canvas
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;

        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
        this.yStandingPosition = this.y;

        this.standingPlayer = new Image();
        this.standingPlayer.src = 'assets/cat-stand.png';
        this.image = this.standingPlayer;

        const catRunImage0 = new Image();
        catRunImage0.src = 'assets/cat-run-0.png';

        const catRunImage1 = new Image();
        catRunImage1.src = 'assets/cat-run-1.png';

        this.catRunImages.push(catRunImage0);
        this.catRunImages.push(catRunImage1);

        window.removeEventListener('keydown', this.keydown);
        window.removeEventListener('keyup', this.keyup);

        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
    }

    keydown = (event)=>{
        if(event.code === 'Space'){
            this.jumpPressed = true;
        }
    }

    keyup = (event)=>{
        if(event.code === 'Space'){
            this.jumpPressed = false;
        }
    }

    update(gameSpeed, frameTimeDelta){
        this.run(gameSpeed, frameTimeDelta);

        if(this.jumpInProgress){
            this.image = this.standingPlayer;
        }

        this.jump(frameTimeDelta);
    }

    jump(frameTimeDelta){
        if(this.jumpPressed){
            this.jumpInProgress = true;
        }

        if(this.jumpInProgress && !this.falling){
            if(this.y > this.canvas.heiht - this.minJumpHeight ||
                (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)){
                this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
            }
            else{
                this.falling = true;
            }
        }
        else{
            if(this.y < this.yStandingPosition){
                this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
                if(this.y + this.height > this.canvas.height){
                    this.y = this.yStandingPosition;
                }
            }
            else{
                this.jumpInProgress = false;
                this.falling = false;
            }
        }
    }

    run(gameSpeed, frameTimeDelta){
        if(this.walkAnimationTimer <= 0){
            if(this.image === this.catRunImages[0]){
                this.image = this.catRunImages[1];
            } else {
                this.image = this.catRunImages[0];
            }
            this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        } 
        this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}