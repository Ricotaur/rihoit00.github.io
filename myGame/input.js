export class Input{
    constructor(){
        this.keys =[];
        this.touchY = '';
        this.touchTreshhold = 30;
        window.addEventListener('keydown', e => {
            if((e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight'
            ) && 
            this.keys.indexOf(e.key) === -1)
            {
                this.keys.push(e.key);
                console.log(e.key, this.keys);
            }
        });
        window.addEventListener('keyup', e => {
            if(e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight')
            {    
            this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            
            console.log(e.key, this.keys);
        });
        window.addEventListener('touchstart', e => {
            this.touchY = e.changedTouches[0].pageY;
        });
        window.addEventListener('touchmove', e => {
            const swipeDistance = e.changedTouches[0].pageY - this.touchY;
            if(swipeDistance < -this.touchTreshhold && this.keys.indexOf('swipeUp') === -1){ this.keys.push('swipeUp');}
            else if(swipeDistance > this.touchTreshhold && this.keys.indexOf('swipeDown') === -1){ this.keys.push('swipeDown');}
        });
        window.addEventListener('touchend', e => {
            console.log(this.keys);
            this.keys.splice(this.keys.indexOf('swipeUp'), 1);
            this.keys.splice(this.keys.indexOf('swipeDown'), 1);
        });
    }

}