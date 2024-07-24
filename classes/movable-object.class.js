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
    acceleration = 1



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
          this.speedY = 17
          this.jump_sound.play();
          
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