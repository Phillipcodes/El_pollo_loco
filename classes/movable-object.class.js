/**
 * @class
 */
class MovableObject extends DrawableObject {
  speed = 0.12;
  otherDirection = false;
  idleTimeout = null;
  movementTimeout = null;
  isSleeping = false;
  isIdle = false;
  idleDuration = 350;
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


  /**
   * sets death and the right image
   */
  die() {
    this.isDead = true;
    this.speed = 0;
    this.loadImage(this.IMAGES_DEAD[0]);
  }


  /**
   * validate the hit how much dmg and if its form above
   * @param {*} damage - dmg to healh
   * @param {*} fromAbove - controlls if dmg comve form above
   */
  hit(damage, fromAbove = false) {
    if (this.isHurt()) {
      
      return;
    }
    if (!fromAbove ) {
      this.health -= damage;
      if (this.health < 0) {
        this.health = 0;

        
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  }


  /**
   * Checks if the object is currently in a "hurt" state based on the time since the last hit.
   * The object is considered "hurt" if less than 0.5 seconds have passed since the last hit.
   *
   * @returns {boolean} `true` if the object is still in the "hurt" state (i.e., less than 0.5 seconds have passed since the last hit), `false` otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.7;
  }


  /**
   *  sets when death health to 0
   * @returns {number}
   */
  isDead() {
    return this.health == 0;
  }


  /**
   * sets a gravity logic to the world
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        this.inAir = false;

        if (this.y > 380 && this.isAboveGround()) {
          this.y = 380;
          this.speedY = 0;
          this.inAir = false;
        }
      }
    }, 1000 / 60);
  }


  applyGravityCharacterJump() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.y > 185) {
          this.y = 185;
          this.speedY = 0;
          this.inAir = false;
          if (this.hasBounced) {
            this.resetBounce();
          }
        } else {
          this.inAir = true;
        }
      }
    }, 1000 / 60);
  }


  /**
   * checks if a movable object above ground
   * @returns {number}
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return this.y < 350;
    }
    if (this instanceof BabyChicken) {
      return this.y < 380;
    } else {
      return this.y < 185;
    }
  }


  /**
   * sets jump logic
   * @param {number} speedY
   */
  jump(speedY) {
    this.inAir = true;
    this.isSleeping = false;
    this.isIdle = false;
    this.speedY = speedY;
    this.currentImage = 0;
  }


  /**
   * sets move right logic
   */
  moveRight() {
    this.x += this.speed;
    this.isSleeping = false;
  }


  /**
   * sets move left logic
   */
  moveleft() {
    this.x -= this.speed;
    this.isSleeping = false;
  }
}
