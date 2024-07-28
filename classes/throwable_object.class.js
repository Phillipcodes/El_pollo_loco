class ThrowableObject extends MovableObject {
    throw_sound = new Audio('./audio/throw_sound.mp3')
    sounds = [SoundManager.getSound('throw')];

    constructor(x,y,range) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png')
        this.x = x;
        this.y = y;
        range = range
        this.height = 70
        this.width = 70
        this.throw(range)
       
    }

    throw(range) {
       
        this.playSound();
        this.speedY = 12
        this.applyGravity()
        setInterval(() => {
            this.x += range
            
        }, 1000/60);
    
    }


    playSound() {
        let sound = SoundManager.getSound('throw');
        sound.play();
    }


    
}
