/**
 * @class
 */
class ThrowableObject extends MovableObject {
    throw_sound = SoundManager.getSound('throw')
    sounds = [SoundManager.getSound('throw')];
    isThrown = false
    bottleHit = false 
    removeAfter = 0.15;
    touchdownTime = null;
    IMAGES_SPIN = ['./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png','./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png','./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png','./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',];
    IMAMGES_SPLASH = ['./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
                       './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
                       './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
                       './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
                       './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
                       './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    DMG = 25
    throwInterval = null;


    constructor(x,y,range) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png')
        this.loadImages(this.IMAGES_SPIN)
        this.loadImages(this.IMAMGES_SPLASH);
        this.x = x;
        this.y = y;
        range = range
        this.height = 70
        this.width = 70
    }


/**
 * Animates the throw
 */
    animateThrow() {
      this.throwAnimation =   setInterval(() => {
            this.playAnimation(this.IMAMGES_SPLASH)
            if(this.currentImage >= this.IMAMGES_SPLASH.length) {
                clearInterval(this.throwAnimation)
            }
        }, 60);
        
    }


    /**
     * starts the throw  and checks in which state the current throw is 
     * @param {number} range - how far the throw flys
     */
    throw(range) {
        this.setThrowStart();
        this.throwInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SPIN);
          this.x += range;
          if (this.y >= 350) {
            this.y = 350; 
            clearInterval(this.throwInterval);
            this.animateThrow();
            this.handleTouchdown();
          }
          if(this.bottleHit == true) {
            this.removeAfter = 0.004
            this.playAnimation(this.IMAMGES_SPLASH)
            this.handleTouchdown()
          }
        }, 1000 / 60);
      }


      /**
       * sets the conditions for the throw
       */
      setThrowStart() {
        this.throw_sound.play();
        this.isThrown = true;
        this.speedY = 12; 
        this.applyGravity();
      }


      /**
       * check time between colision or ground contact
       */
      handleTouchdown() {
        this.touchdownTime = new Date().getTime();
        this.isThrown = false;
      }
    

     /**
      *Determines if an object should be removed based on the elapsed time since touchdown.
      * The object is removed if the time since `touchdownTime` exceeds `removeAfter`.
      *
      * @returns {boolean} `true` if the object should be removed, `false` otherwise.
      */
      shouldRemove() {
        if (this.touchdownTime) {
          let currentTime = new Date().getTime();
          let timePassed = (currentTime - this.touchdownTime) / 1000; // Zeit in Sekunden
          return timePassed >= this.removeAfter;
        }
        return false;
      }
}
