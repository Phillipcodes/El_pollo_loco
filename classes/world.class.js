class World {
  character = new Character();
  level = level1;
  lastThrowTime = 0; // Statische Variable für globalen Cooldown
  throwCooldown = 1750;
  canvas; 
  ctx;
  keyboard;
  camera_x = 0;
  statusbar = new StatusBar();
  coinbar = new CoinBar();
  bottlebar = new BottleBar();
  endbossBar = new EndbossBar();
  throwableObjects = [];
  background_sound = SoundManager.getSound('backgroundMusic',0.4)


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.character.setMax(this.level.coins.length,this.level.bottles.length);
    this.run();
    this.background_sound.play()
    
  }


/**
 *  sets the chracter to the world
 */
  setWorld() {
    this.character.world = this;
    
  }


/**
 * Executes necessary functions to check collisions and update the game state.
 * This method is called at regular intervals to ensure the game correctly responds to collisions and other events.
 *
 * The following functions are called:
 * - `checkEnemyCollision()`: Checks for collisions with enemies.
 * - `checkThrowObject()`: Checks for thrown objects.
 * - `checkBottleCollision()`: Checks for collisions with bottles.
 * - `checkCoinCollision()`: Checks for collisions with coins.
 * - `checkCollisionThrow()`: Checks for collisions of thrown objects.
 * - `checkCollisionAbove()`: Checks for collisions with objects above the player.
 * - `updateThrow()`: Updates the status of thrown objects.
 * - `checkEndbossActivation()`: Checks if the endboss should be activated.
 *
 * This method is executed every 100 milliseconds.
 *
 * @method
 */
 run() {
    setInterval(() => {
      this.checkEnemyCollision();
      this.checkThrowObject();
      this.checkBottleCollision(); 
      this.checkCoinCollision();
      this.checkCollisionThrow();
      this.checkCollisionAbove();
      this.updateThrow();
      this.checkEndbossActivation();
      
    }, 100);
  }
  
 
  checkEndbossActivation() {
    setInterval(() => {
      this.level.enemies.forEach(enemy => {
        if (enemy instanceof Endboss) {
          this.activateEndboss(enemy);
        }
      });
    }, 100);
  }


  /**
   * activate endboss movement
   */
  activateEndboss(endboss) {
    if (Math.abs(this.character.x - endboss.x) < 450) { 
      endboss.startMoving(); 
    }
  }


  checkThrowObject() {
    if (this.isThrowAllowed()) {
        this.lastThrowTime = Date.now();
        let { throwRange, xOffset } = this.setThrowParameters();
        let bottle = this.createBottle(xOffset, throwRange);
        this.throwableObjects.push(bottle);
        bottle.throw(throwRange);
        this.updateBottleAmount();
    }
}


/**
 * checks if throw is on cooldown
 * @returns {boolean}
 */
isThrowAllowed() {
    const currentTime = Date.now();
    if (this.keyboard.SPACE && this.character.bottleAmount > 0) {
        if (currentTime - this.lastThrowTime < this.throwCooldown) {
            console.log('Cooldown noch nicht abgelaufen.');
            return false; 
        }
        return true; 
    }
    return false; 
}


/**
 *  set Throw variables like range and the offsetX
 * @returns {Object}
 */
setThrowParameters() {
    let throwRange = 10;
    let xOffset = 40;
    if (this.character.otherDirection) {
        throwRange = -10;
        xOffset = -30;
    }
    return { throwRange, xOffset };
}


/**
 * creates bottle with the specified params
 * @param {number} xOffset 
 * @param {number} throwRange 
 * @returns {throwableObjects}
 */
createBottle(xOffset, throwRange) {
    return new ThrowableObject(this.character.x + xOffset, this.character.y + 100, throwRange);
}


/**
 * Updates bottle Amount after throw
 */
updateBottleAmount() {
    this.character.bottleAmount--;
    let setBottlePercentage = (this.character.bottleAmount * 100) / this.character.bottleMax;
    this.bottlebar.setPercentage(setBottlePercentage);
}


  checkEnemyCollision() {
    this.level.enemies.forEach(enemy => {

      if (enemy.isDead) {
        // Skips dead enemies
        return;
      }

      if (this.character.isColliding(enemy)) {
        if (!this.character.isCollidingAbove(enemy)) {
       
          console.log('Collision detected', enemy);
          this.character.hit(enemy.DMG);
          this.statusbar.setPercentage(this.character.health);
        }

      }
    });
  }

  
  checkBottleCollision() {
    this.level.bottles.forEach(bottle => {
      if(this.character.isColliding(bottle)) {
        console.log('collison detected', bottle);
        this.character.collectItem(bottle,this.level.bottles);
        this.character.updateCollectables()
        let setBottlePercentage = this.character.bottleAmount * 100 / this.character.bottleMax 
        this.bottlebar.setPercentage(setBottlePercentage)
      }
    });    
  }


  checkCollisionAbove() {
    this.level.enemies.forEach(enemy => {

      if (enemy.isDead) {
      
        return;
      }
      

        if (this.character.isCollidingAbove(enemy)) {
            console.log('Collision detected above', enemy);
            
         
            this.character.bounce(); 
            
            enemy.die();
           
            this.level.removeEnemy(enemy);
        }
    
    });
}


  checkCoinCollision() {
    this.level.coins.forEach(coin => {
      if(this.character.isColliding(coin)) {
        console.log('collison detected', coin);
        this.character.collectItem(coin,this.level.coins)
        this.character.updateCollectables('coinAmount')
        let setCoinPercentage = this.character.coinAmount * 100 / this.character.coinMax 
        this.coinbar.setPercentage(setCoinPercentage)
      }
      
    });
    
  }


  checkCollisionThrow() {
    this.throwableObjects.forEach(thr => {
      if (thr.isThrown && !thr.hasHit) { 
        let hit = false;
        this.level.enemies.forEach(enemy => {
          if (thr.isColliding(enemy)) {
            if (!thr.hasHit && enemy instanceof Endboss) { 
              thr.hasHit = true; 
              thr.bottleHit = true
              this.updateEndbossStatusBar(thr.DMG);
              
            }
            hit = true;
          }
        });
  
        if (hit) {
       
          
        }
      }
    });
  }


  /**
   * Updates Boss status bar based on his health
   * @param {number} thr 
   */
  updateEndbossStatusBar(thr) {
    const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    if (endboss) {
      endboss.hit(thr)

      this.endbossBar.setPercentage(endboss.health);
      
    } if(endboss.health == 0) {
      endboss.die()
    }
  }

  
  
  /**
   *  draws the canvan elements
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.BackgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.drawStatusBars();
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles); // maybe rewirte the draw function for none moveable objects jsut to make it clearer what in which class it contains 
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects)
    this.ctx.translate(-this.camera_x, 0);
    self = this;
    requestAnimationFrame(function () { 
     
      self.draw();
    });
  }


  /**
   * Draws the statusbars
   */
  drawStatusBars() {
    this.ctx.translate(-this.camera_x, 0); //Back
    this.addToMap(this.statusbar)
    this.addToMap(this.coinbar)
    this.addToMap(this.bottlebar)
    if(this.isEndbossClose()) {
      this.addToMap(this.endbossBar)
    }
    this.ctx.translate(this.camera_x, 0);
  }


  /**
   * adds objects to the canvan 
   * @param {object[]} objects 
   */
  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }


  /**
 * Adds a `MovableObject` to the canvas.
 * This method handles the drawing and flipping of the object based on its direction.
 *
 * @param {MovableObject} mo - The movable object to be added to the canvas. This object should have properties and methods like `draw`,  and `otherDirection`.
 * 
 */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo)
    }
  }


  /**
   * Flips the movable object
   * @param {MovableObject} 
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
}


 /**
   * Flips the movable object back
   * @param {MovableObject} 
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }


  /**
   * initializie sound button 
   */
  initializeSoundButton() {
    const soundButton = document.getElementById('sound-button');
   
      if (playSound) {
        SoundManager.muteAll();;
        soundButton.src = './img/10_overlay_icons/volume.png'; 
        playSound = false;
      } else {
        SoundManager.unmuteAll();
        soundButton.src = './img/10_overlay_icons/no_sound.png'; 
        playSound = true;
      }
    };
  

updateThrow() {
  this.throwableObjects = this.throwableObjects.filter(obj => !obj.shouldRemove());
}


/**
 * check distance to between character and boss
 * @returns {number} - postion x from chracter
 */
checkEndbossDistance() {
 return this.character.x
}


/**
 *  checks if boss is close to character
 * @returns {number} - distance lower than 600
 */
isEndbossClose() {
  const characterX = this.character.x;
  const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
  const endbossX = endboss.x;
  const distance = Math.abs(characterX - endbossX)
  return distance < 600; 
}
}
