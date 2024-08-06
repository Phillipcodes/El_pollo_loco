class Character extends MovableObject {
  height = 250;
  y = 185; //standard valuve 155
  offset = {
    top: 85, //offset x iist links y top  width is right height is bottom
    bottom: 10,
    left: 20,
    right: 20,
  };
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_SLEEPING = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = ["./img/2_character_pepe/4_hurt/H-41.png", "./img/2_character_pepe/4_hurt/H-42.png", "./img/2_character_pepe/4_hurt/H-43.png"];

  IMAGES_IDLE = ['./img/2_character_pepe/1_idle/idle/I-1.png',
                './img/2_character_pepe/1_idle/idle/I-2.png',
                './img/2_character_pepe/1_idle/idle/I-3.png',
                './img/2_character_pepe/1_idle/idle/I-4.png',
                './img/2_character_pepe/1_idle/idle/I-5.png',
                './img/2_character_pepe/1_idle/idle/I-6.png',
                './img/2_character_pepe/1_idle/idle/I-7.png',
                './img/2_character_pepe/1_idle/idle/I-8.png',
                './img/2_character_pepe/1_idle/idle/I-9.png',             
  ];
  world;
  DMG = 10;
  speed = 4;
  coinAmount = 0;
    coinMax = 0;

  bottleAmount = 0;
  bottleMax = 0;
  hasBounced = false;
  walking_sound = SoundManager.getSound('walk', 0.2);
  idle_sound = SoundManager.getSound('idle', 0.2);
  jump_sound = SoundManager.getSound('jump', 0.2);
  hurt_sound = SoundManager.getSound('hit', 0.2);
  full_sound = SoundManager.getSound('pepeFull', 0.2)
  collect_sound = SoundManager.getSound('collect', 0.2)
  

  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
    
  }

  setMax(coinMax,bottleMax) {
    this.coinMax = coinMax;
    this.bottleMax = bottleMax;
    
}

updateCollectables(amount) {
  if(amount === 'coinAmount') {
  this.coinAmount++
 
  }else {
    this.bottleAmount++
    
  }
  if(this.bottleAmount == this.bottleMax) {
    this.full_sound.play();
  }
  this.collect_sound.play();
 
}

bounce() {
  if (!this.hasBounced) {
    this.speedY = 10; // Passt den Wert an, um die Intensität des Bounces zu steuern
    this.hasBounced = true; // Setze die Flagge, um den Bounce nur einmal auszulösen
    
}
}

resetBounce() {
  this.hasBounced = false; // Setze die Flagge zurück, wenn der Charakter den Boden erreicht oder sich bewegt
}


  animate() {
    setStoppableInterval(() => {
      this.handleCharacter();
    }, 1000 / 60);
    setStoppableInterval(() => {
      this.characterMovementanimation();
    }, 105);
    setStoppableInterval(() => {
     this.idleAnimation();
    }, 120); 
  }

  idleAnimation() {
    if (this.isSleeping) {
      this.playAnimation(this.IMAGES_SLEEPING);
    } else if(this.isIdle) {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  characterMovementanimation() {
    if (this.isDead()) {
      if (!this.isDeadFlag) {
        this.isDeadFlag = true;
        this.playAnimation(this.IMAGES_DEAD);
        pepeDead();
      }
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.hurt_sound.play();
  
    } else if (this.isAboveGround()) {
     this.handleJumpAnimation()
    } else {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }
  }

  handleCharacter() {
    this.handleMovement();
    this.handleIdleSound(); // Call the new function for handling the idle sound
    this.world.camera_x = -this.x + 80;
  }

  handleMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.otherDirection = false;
      this.moveRight(); 
      this.detectMovement();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.otherDirection = true;
      this.moveleft(); 
      this.detectMovement();
    }
    if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump(this.speedY= 11);
        
        this.jump_sound.play();
        this.detectMovement();
      }
      

    // Check if character is moving and play walkkking sound
    if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
      if (this.walking_sound.paused) {
        this.walking_sound.currentTime = 0; // Reset sound to start
        this.walking_sound.play();
      }
    } else {
      this.walking_sound.pause();
    }
   
  }

  handleIdleSound() {
    if (this.isSleeping) {
      if (this.idle_sound.paused) {
        this.idle_sound.currentTime = 0; // Reset sound to start
        this.idle_sound.play();
      }
    } else {
      this.idle_sound.pause();
    }
  }

  resetMovementTimeout() {
    // Clear the previous timeouts if they exist
    if (this.movementTimeout) {
      clearTimeout(this.movementTimeout);
    }
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
    }
    // Set a new timeout to set isSleeping to true after 10 seconds
    this.movementTimeout = setTimeout(() => {
      if(!this.isDead()){
      this.isSleeping = true; // Set sleeping state after inactivity
      this.playAnimation(this.IMAGES_SLEEPING);
    }
    }, this.sleepDuration);

    // Set a new timeout to set isIdle to true after 1 second
    this.idleTimeout = setTimeout(() => {
      if (!this.isSleeping && !this.isDead()) {
        this.isIdle = true; // Set idle state after 1 second of inactivity
        this.playAnimation(this.IMAGES_IDLE); // Optional: Use idle images if different
      }
    }, this.idleDuration);
  }

  detectMovement() {
    this.isIdle = false; // Reset idle state
    this.resetMovementTimeout(); // Reset movement timeout
  }

handleJumpAnimation() {
  let i = 0
  if(i < this.IMAGES_JUMPING.length) {
    this.playAnimation(this.IMAGES_JUMPING)
    i++
  }else {
    this.setMovementAnimation();
  }
  if(!this.isAboveGround()) {  // vllt eine attackk erstellen wo er kurz stehen bleibt und seine attack animation bekkommt und dann 3 sekkunden lang schnell rennt 
    i = 0 
    this.firstContact= true
  }
}

}