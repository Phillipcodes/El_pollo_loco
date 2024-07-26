class MovableObject extends DrawableObject{
  speed = 0.12;
  otherDirection = false;
  idleTimeout = null; // Timeout for idle state
  movementTimeout = null; // Timeout for sleeping state
  isSleeping = false;
  isIdle = false;
  idleDuration = 350; // 1 second
  sleepDuration = 10000; 
  speedY = 0;
  speedX = 0;
  acceleration = 0.6;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  health = 100;
  DMG = 10;
  lastHit = 0;
 

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit(enemy) {
    this.health -= enemy;
    if(this.health < 0) {
        this.health = 0;
    }else {
        this.lastHit = new Date().getTime();
    }
 
  }


  isHurt() {
    let timepassed  = new Date().getTime() - this.lastHit // difference  in ms
    timepassed =timepassed / 1000 // Diffrence in seconds
    return timepassed < 0.5;
  }


  isDead() {
    return this.health == 0;    
  }


//   drawFrame2(ctx) {
//     if (this instanceof Character || this instanceof Chicken || this instanceof BabyChicken || this instanceof Endboss) {
//       ctx.beginPath();
//       ctx.lineWidth = "5";
//       ctx.strokeStyle = "red";
//       ctx.rect(this.x, this.y, this.width, this.height);
//       ctx.stroke();
//     }
//   }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  isAboveGround() {
    if((this instanceof ThrowableObject)) {
       return true
    }else {
        return this.y < 185;
    }

  }


  jump() {
      this.inAir = true;
      this.isSleeping = false;
      this.speedY = 13;
      this.currentImage = 0;
    
  }

  moveRight() {
    this.x += this.speed;
    this.isSleeping = false;
  }

  moveleft() {
    this.x -= this.speed;
    this.isSleeping = false;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  setStartXEnemieGroup(group, index) {
    const groupSpacing = 550; // Abstand zwischen den Gruppen
    const innerGroupSpacing = 150; // Abstand zwischen den Hühnern innerhalb der Gruppe
    const baseX = 400 + (group - 1) * groupSpacing; // Basisposition je nach Gruppe
    const offset = index * innerGroupSpacing; // Abstand zwischen den Hühnern
    return baseX + offset;
  }
}
