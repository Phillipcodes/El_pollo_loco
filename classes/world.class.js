class World  {
    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
];
canvas;
ctx;

constructor(canvas) {
this.ctx = canvas.getContext('2d');
this.canvas = canvas;
this.draw();
}

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height)
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height)
        }) 
             
        
        //draw wird immer wieder ausgeführt
        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    // draw() {
    //     for (let i = 0; i < this.enemies.length; i++) {
    //         this.enemies[0].y = 400
    //         this.enemies[1].y = 410
    //         this.enemies[2].y = 430
            
    //         let chickens = this.enemies[i]
        
    //         this.ctx.drawImage(chickens.img, chickens.x, chickens.y, chickens.width, chickens.height)
            
    //     }
        
    // }
}