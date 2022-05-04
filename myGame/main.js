import{Player} from './player.js';
import{Input} from './input.js';
import{Background} from './background.js';
import{FlyingObstacle, GroundObstacle} from './obstacles.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.speed = 0;

            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new Input();

            this.obstacles = [];
            this.obstacleTimer = 0;
            this.obstacleInterval = 1000;

            this.score = 0;
        }
        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            if(this.obstacleTimer > this.obstacleInterval){
                this.addObstacle();
                this.obstacleTimer = 0;
            }
            else{if(!isNaN(deltaTime)){this.obstacleTimer += deltaTime;}}

            this.obstacles.forEach(obstacle => {
                obstacle.update(deltaTime);
                if(obstacle.deleteMark) {this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);}
            });

        }
        draw(){
            this.background.draw(ctx);
            this.player.draw(ctx);

            this.obstacles.forEach(obstacle => {
                obstacle.draw(ctx);
            });
        }
        addObstacle(){
            if(this.speed > 0 && Math.random() < 0.5){this.obstacles.push(new GroundObstacle(this));}
            this.obstacles.push(new FlyingObstacle(this));
            //console.log(this.obstacles);
        }
        displayScore(context){
            context.fillStyle = 'black';
            context.font = '40px Arial';
            context.fillText('Score: ' + this.score, 20, 50);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
        game.displayScore(ctx);
    }
    animate();
});