class World {
  character = new Character();
  level = level1;
 
sounds = [];
  canvas; 
  ctx;
  keyboard;
  camera_x = 0;
  statusbar = new StatusBar();
  coinbar = new CoinBar();
  bottlebar = new BottleBar();
  throwableObjects = [];
  

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.character.setMax(this.level.coins.length,this.level.bottles.length);
    this.run();
    this.sounds = [ ...this.character.sounds,];
  }

  setWorld() {
    this.character.world = this;
    
  }

 run() {
   
    setInterval(() => {
      this.checkEnemyCollison();
      this.checkThrowObject();
      this.checkBottleCollison(); 
      this.checkCoinCollison();
      this.checkCollisionThrow();
      this.checkCollisionAbove();
      this.updateThrow();
    }, 100);
  }


  checkThrowObject() {
    if(this.keyboard.SPACE && this.character.bottleAmount > 0) {
      let throwRange = 10;
      let xOffset = 40;
      if(this.character.otherDirection == true) {
        throwRange = -10
        xOffset = -30
      }
      let bottle = new ThrowableObject(this.character.x + xOffset ,this.character.y + 100, throwRange);
      this.throwableObjects.push(bottle);
      this.character.bottleAmount--
      let setBottlePercentage = this.character.bottleAmount * 100 / this.character.bottleMax 
      this.bottlebar.setPercentage(setBottlePercentage)
     }
 
    
  }


  checkEnemyCollison() {
    this.level.enemies.forEach(enemy => {
      if(this.character.isColliding(enemy)) {
        console.log('collison detected', enemy);
        this.character.hit(enemy.DMG);
        this.statusbar.setPercentage(this.character.health)
      }
      
    });
          
  }

  checkBottleCollison() {
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
        if (this.character.isCollidingAbove(enemy)) {
            console.log('Collision detected above', enemy);
            
            // Der Charakter springt und erhält Schaden
            this.character.bounce(); 
            this.character.hit(this.character.DMG);
            
            // Entferne das Huhn aus dem Level
            this.level.removeEnemy(enemy);
        }
    });
}


  

  checkCoinCollison() {
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
      if (thr.isThrown) { // Überprüfe nur geworfene Objekte
        thr.checkCollisionWithEnemies(this.level.enemies);
      }
    });
  }
  
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
      //draw wird immer wieder ausgeführt
      self.draw();
    });
  }

  drawStatusBars() {
    this.ctx.translate(-this.camera_x, 0); //Back
    this.addToMap(this.statusbar)
    this.addToMap(this.coinbar)
    this.addToMap(this.bottlebar)
    this.ctx.translate(this.camera_x, 0);// forwards to makke sure statur line is on same postiton
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo)
    }
  }


  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
}


  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }


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

}
