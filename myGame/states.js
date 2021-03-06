const states ={
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
}

class State{
    constructor(state){
        this.state = state; 
    }
}
//Stillstand---------------------------------------------------------------
export class Sitting extends State{
    constructor(player){
        super('SITTING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 5;
        this.player.maxFrame = 4;
    }

    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.player.setState(states.RUNNING, 2);
        }
    }
}
//Move---------------------------------------------------------------
export class Running extends State{
    constructor(player){
        super('RUNNING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.maxFrame = 8;
    }

    handleInput(input){
        if(input.includes('ArrowDown') || input.includes('swipeDown')){
            this.player.setState(states.SITTING, 0);
        }
        else if (input.includes('ArrowUp') || input.includes('swipeUp')){
            this.player.setState(states.JUMPING, 2);
        }
    }
}
//Jump---------------------------------------------------------------
export class Jumping extends State{
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        if(this.player.onGround()){this.player.vy -= 10;}
        this.player.frameY = 1;
        this.player.maxFrame = 6;
    }

    handleInput(){
        if(this.player.vy > this.player.gravity){
            this.player.setState(states.FALLING, 2);
        }
    }
}
//Fall---------------------------------------------------------------
export class Falling extends State{
    constructor(player){
        super('FALLING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrame = 6;
    }

    handleInput(){
        if(this.player.onGround()){
            this.player.setState(states.RUNNING, 2);
        }
    }
}