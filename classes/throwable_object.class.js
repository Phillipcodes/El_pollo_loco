class ThrowableObject extends MovableObject {
    

    constructor(x,y) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png')
        this.x = x;
        this.y = y;
        this.height = 70
        this.width = 70
        this.throw()
    }

    throw() {
        this.speedY = 12
        this.applyGravity()
        setInterval(() => {
            this.x += 10
        }, 1000/60);
    }
}