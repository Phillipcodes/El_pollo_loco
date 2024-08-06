class ThrowableObject extends MovableObject {
    throw_sound = SoundManager.getSound('throw')
    sounds = [SoundManager.getSound('throw')];
    isThrown = false
    bottleHit = false 
    removeAfter = 0.15; // Zeit in Sekunden nach Kollision oder Bodenkontakt
    touchdownTime = null;
    IMAGES_SPIN = ['./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png','./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png','./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png','./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',];
    IMAMGES_SPLASH = ['./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
                       './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
                       './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
                       './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
                       './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
                       './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    DMG = 100
    lastThrowTime = 0; // Zeitstempel des letzten Wurfs
    throwCooldown = 2000; // Cooldown in Millisekunden (2 Sekunden)
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

    animateThrow () {
      this.throwAnimation =   setInterval(() => {
            this.playAnimation(this.IMAMGES_SPLASH)
            if(this.currentImage >= this.IMAMGES_SPLASH.length) {
                clearInterval(this.throwAnimation)
            }
        }, 60);
        
    }

    throw(range) {

      

        this.setThrowStart();
        // Wurf-Intervall für horizontale Bewegung
        this.throwInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SPIN);
          this.x += range;
          // Überprüfe, ob die Flasche den Boden erreicht hat
          if (this.y >= 350) {
            this.y = 350; // Stelle sicher, dass y nicht unter den Boden sinkt
            clearInterval(this.throwInterval);
            this.animateThrow();
            this.handleTouchdown()
             // Stoppe das Intervall für die horizontale Bewegung
          }
          if(this.bottleHit == true) {
            this.removeAfter = 0.004
            this.playAnimation(this.IMAMGES_SPLASH)
            this.handleTouchdown()
          }
        }, 1000 / 60);
      }





      setThrowStart() {
        this.throw_sound.play()
        this.isThrown = true;
        this.speedY = 12; // Anfangsgeschwindigkeit
        this.applyGravity();
      }

      handleTouchdown() {
        // Handler für Bodenkontakt oder Kollision
        this.touchdownTime = new Date().getTime();
        this.isThrown = false;
      }
    
      shouldRemove() {
        if (this.touchdownTime) {
          let currentTime = new Date().getTime();
          let timePassed = (currentTime - this.touchdownTime) / 1000; // Zeit in Sekunden
          return timePassed >= this.removeAfter;
        }
        return false;
      }

    
    
}
