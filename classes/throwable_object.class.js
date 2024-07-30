class ThrowableObject extends MovableObject {
    throw_sound = SoundManager.getSound('throw')
    sounds = [SoundManager.getSound('throw')];
    isThrown = false
    bootleHit = false 
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
    constructor(x,y,range) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png')
        this.loadImages(this.IMAGES_SPIN)
        this.loadImages(this.IMAMGES_SPLASH);
        this.x = x;
        this.y = y;
        range = range
        this.height = 70
        this.width = 70
      
        this.throw(range)
       
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
          if(this.bootleHit == true) {
            this.removeAfter = 0.004
            this.playAnimation(this.IMAMGES_SPLASH)
            this.handleTouchdown()
          }
        }, 1000 / 60);
      }

      checkCollisionWithEnemies(enemies) {
        enemies.forEach(enemy => {
          if (this.isColliding(enemy)) {
            console.log('Kollision mit Gegner erkannt:', enemy);
            
            this.bootleHit = true;
            // this.handleCollisionWithEnemy(enemy); // Verarbeite die Kollision
       
          }
          
        });
      }



//   handleCollisionWithEnemy(enemy) {
//     // Hier kannst du die Logik implementieren, die ausgeführt werden soll, wenn eine Kollision auftritt
//     console.log('Gegner getroffen:', enemy);
//     // Beispiel: Reduziere die Gesundheit des Gegners oder entferne ihn
//     enemy.health -= this.DMG; // Verwende den DMG-Wert des `ThrowableObject`
//     if (enemy.health <= 0) {
//       // Entferne den Gegner, wenn seine Gesundheit auf 0 oder weniger sinkt
//       // Hier musst du möglicherweise den Gegner aus der Gegner-Liste entfernen
//     }
//     this.isThrown = false; // Setze den Status zurück, wenn die Kollision verarbeitet ist
//   }



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
