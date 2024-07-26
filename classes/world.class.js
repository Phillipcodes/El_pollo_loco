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
    this.run();
    this.sounds = [ ...this.character.sounds];
  }

  setWorld() {
    this.character.world = this;
    
  }

 run() {
   
    setInterval(() => {
      this.checkEnemyCollison();
      this.checkThrowObject();
      
    }, 100);
  }


  checkThrowObject() {
    if(this.keyboard.SPACE) {
      let bottle = new ThrowableObject(this.character.x + 40 ,this.character.y + 100);
      this.throwableObjects.push(bottle)
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
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.BackgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.drawStatusBars();
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins); // maybe rewirte the draw function for none moveable objects jsut to make it clearer what in which class it contains 
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

  muteAllSounds() {
    let soundImg = document.getElementById('sound-button');
    if(playSound) {
      this.sounds.forEach(sound => {
        sound.muted = true;
      
      });
      soundImg.src = '../img/10_overlay_icons/volume.png'
      playSound = false
    }
 
  }

  unmuteAllSounds() {
    let soundImg = document.getElementById('sound-button');
    if(!playSound) {
      this.sounds.forEach(sound => {
        sound.muted = false;
  
      });
      soundImg.src = '../img/10_overlay_icons/no_sound.png'
      playSound = true
    }
   
  }

  initializeSoundButton() {
    const soundButton = document.getElementById('sound-button');
    soundButton.onclick = () => {
      if (playSound) {
        this.muteAllSounds();
        soundButton.src = '../img/10_overlay_icons/volume.png'; 
        playSound = false;
      } else {
        this.unmuteAllSounds();
        soundButton.src = '../img/10_overlay_icons/no_sound.png'; 
        playSound = true;
      }
    };
  }


  
}
