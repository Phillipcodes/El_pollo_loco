class MovableObject {
    x = 120;
    y = 275;
    img;
    height = 150;
    width = 100;
    speed = 0.12
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    isSleeping = false;
    movementTimeout = null; 
    speedY = 0;
    acceleration = 0.7
  offset = {
    top:  0,     //offset x iist links y top  width is right height is bottom
    bottom: 0,
    left:0,
    right: 0

  }
   

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
         
    }


    isColliding (mo) {
      
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left&&
        this.y + this.height -this.offset.bottom > mo.y + mo.offset.top &&
        this.x +this.offset.left < mo.x + mo.width - mo.offset.right&&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

      
}




    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken ||this instanceof BabyChicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect( this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
     

        if (this instanceof Character || this instanceof Chicken ||this instanceof BabyChicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top,(this.x + this.width - this.offset.right) - (this.x + this.offset.left),(this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));
            ctx.stroke();
        }

    }


       drawFrame2(ctx) {
        if(this instanceof Character || this instanceof Chicken ||this instanceof BabyChicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect( this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
     
    }


    applyGravity() {
        setInterval(()=> {
            if(this.isAboveGround() || this.speedY >0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration
            }
      
        },1000/60)
    }


    isAboveGround() {
      return  this.y < 150
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image()
            img.src = path
           this.imageCache[path] = img
        });
       
    }




    jump() {
        if(this.world.keyboard.UP && !this.isAboveGround() ) {
          this.inAir = true
          this.isSleeping = false
          this.speedY = 15
          this.jump_sound.play();
          this.currentImage = 0
          
        }
      };


    moveRight() {
            this.x += this.speed;
            this.isSleeping = false; 
    };

    moveleft() {
            this.x -= this.speed 
            this.isSleeping = false;
    };

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++
    };

    setStartXEnemieGroup(group, index) {
        const groupSpacing =  550; // Abstand zwischen den Gruppen
        const innerGroupSpacing = 150; // Abstand zwischen den Hühnern innerhalb der Gruppe
        const baseX = 400 + (group - 1) * groupSpacing; // Basisposition je nach Gruppe
        const offset = index * innerGroupSpacing; // Abstand zwischen den Hühnern
        return baseX + offset;
    }


}