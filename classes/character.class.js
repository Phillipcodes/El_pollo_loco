/**
 * @class
 */
class Character extends MovableObject {
  height = 250;
  y = 185; //standard valuve 155
  offset = {
    top: 95, //offset x iist links y top  width is right height is bottom
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
 

  jumpStartImages = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
     "./img/2_character_pepe/3_jump/J-34.png",
      "./img/2_character_pepe/3_jump/J-34.png",
       "./img/2_character_pepe/3_jump/J-34.png"
  ];

  jumpFallImages = [
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png"
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

  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
  ];
  world;
  DMG = 10;
  speed = 4;
  coinAmount = 0;
  coinMax = 0;
  bottleAmount = 0;
  bottleMax = 0;
  hasBounced = false;
  isJumping = false; // Track if the character is jumping
  jumpPhase = 'start'; // 'start' or 'fall'
  jumpStartInterval;
  jumpFallInterval;
  jumpStartDuration = 400; // Duration for jump start phase (in ms)
  jumpFallDuration = 970; 
  walking_sound = SoundManager.getSound("walk", 0.3);
  idle_sound = SoundManager.getSound("idle", 0.3);
  jump_sound = SoundManager.getSound("jump", 0.3);
  hurt_sound = SoundManager.getSound("hit", 0.3);
  full_sound = SoundManager.getSound("pepeFull", 0.4);
  collect_sound = SoundManager.getSound("collect", 0.3);


  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.jumpStartImages)
    this.loadImages(this.jumpFallImages)
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravityCharacterJump();
    this.animate();
  }


  /**
   * sets the Max amount of colectables
   * @param {number} coinMax
   * @param {number} bottleMax
   */
  setMax(coinMax, bottleMax) {
    this.coinMax = coinMax;
    this.bottleMax = bottleMax;
  }


  /**
   *  updates collectables amount
   * @param {number} amount
   */
  updateCollectables(amount) {
    if (amount === "coinAmount") {
      this.coinAmount++;
    } else {
      this.bottleAmount++;
    }
    if (this.bottleAmount == this.bottleMax) {
      this.full_sound.play();
    }
    this.collect_sound.play();
  }


  /**
   * let the player bounce when colliding with an enmies from above
   */
  bounce() {
    if (!this.hasBounced) {
      this.speedY = 11; 
      this.hasBounced = true;
    }
  }


  /**
   * resets the bounce status
   */
  resetBounce() {
    this.hasBounced = false;
    this.currentImage = 0
  }


  animate() {
    setStoppableInterval(() => {
      this.handleCharacter();
    }, 1000 / 60);
    setStoppableInterval(() => {
      this.characterMovementanimation();
    }, 135);
    setStoppableInterval(() => {
      this.handleJumpAnimation();
    }, 130);
    setStoppableInterval(() => {
      this.idleAnimation();
    }, 120);
  }


  /**
   * handles jump animation when in air
   */
 
  handleJumpAnimation() {
    if (this.isJumping) {
      if (this.jumpPhase === 'start') {
        this.startJumpAnimation();
      } else if (this.jumpPhase === 'fall') {
        this.startFallAnimation();
      }
    }
  }

  /**
   * Start jump start animation
   */
  startJumpAnimation() {
    
    if (this.jumpStartInterval) return; 
    this.currentImage = 0;
    this.jumpStartInterval = setInterval(() => {
      this.playAnimation(this.jumpStartImages);
      if (this.speedY <= 0 ) {
        this.jumpPhase = 'fall';
        clearInterval(this.jumpStartInterval);
        this.jumpStartInterval = null;
        this.handleJumpAnimation(); 
      }
    }, this.jumpStartDuration / this.jumpStartImages.length);
  }

  /**
   * Start jump falling animation
   */
  startFallAnimation() {
    if (this.jumpFallInterval) return; 
    this.currentImage = 0;
    this.jumpFallInterval = setInterval(() => {
      this.playAnimation(this.jumpFallImages);
      if (!this.inAir) {
        clearInterval(this.jumpFallInterval);
        this.jumpFallInterval = null;
        this.resetJump(); 
      }
    }, this.jumpFallDuration / this.jumpFallImages.length); 
  }

  /**
   * Resets the jump phase and intervals
   */
  resetJump() {
    // this.currentImage = 0;
    this.isJumping = false;
    this.jumpPhase = 'start'; 
    this.speedY = 0; 
    this.playAnimation(this.IMAGES_IDLE);

  }

  /**
   * sets the idle Animation
   */
  idleAnimation() {
    if (this.isSleeping && !this.isAboveGround()) {
      this.playAnimation(this.IMAGES_SLEEPING);
    } else if (this.isIdle && !this.isAboveGround()) {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }


  /**
   * sets the Movement animation for the player
   */
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
    } else {
      if (this.playWalkAnimationWhenNotinAir()) this.playAnimation(this.IMAGES_WALKING);
      
    }
  }


  /**
   * checks if movement animation is valid  to play
   * @returns {boolean}
   */
  playWalkAnimationWhenNotinAir() {
  return this.world.keyboard.RIGHT  && !this.isAboveGround() || this.world.keyboard.LEFT && !this.isAboveGround()
  }


  /**
   * interface for chracter movements
   */
  handleCharacter() {
    this.handleMovement();
    this.handleIdleSound();
    this.world.camera_x = -this.x + 80;
  }


  /**
   * handle movement based on input
   */
  handleMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) this.characterMovementRight();
    if (this.world.keyboard.LEFT && this.x > 0) this.characterMovementLeft();
    if (this.world.keyboard.UP && !this.isAboveGround()) this.characterMovementJump();
    if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
      if (this.walking_sound.paused) {
        this.walking_sound.currentTime = 0;
        this.walking_sound.play();
      }
    } else {
      this.walking_sound.pause();
    }
  }


  /**
   * sets behaviour for movment to the right
   */
  characterMovementRight() {
    this.otherDirection = false;
    this.moveRight();
    this.detectMovement();
  }


  /**
   * sets behaviour for movment to the left
   */
  characterMovementLeft() {
    this.otherDirection = true;
    this.moveleft();
    this.detectMovement();
  }


  /**
   * sets behaviour for movment for the Jump
   */
  characterMovementJump() {
    this.isJumping = true;
    this.jumpPhase = 'start'
    this.jump((this.speedY = 11));
    this.jump_sound.play();
    this.detectMovement();
    
  }


  /**
   * handles the sound when to play the sleep or idle sound
   */
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


  /**
   * resets the movement timeout for the idle animation when moved
   */
  resetMovementTimeout() {
    if (this.movementTimeout) clearTimeout(this.movementTimeout);
    if (this.idleTimeout) clearTimeout(this.idleTimeout);
    this.movementTimeout = setTimeout(() => {
      if (!this.isDead()) {
        this.isSleeping = true;
        this.playAnimation(this.IMAGES_SLEEPING);
      }
    }, this.sleepDuration);
    this.idleTimeout = setTimeout(() => {
      if (!this.isSleeping && !this.isDead()) {
        this.isIdle = true;
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, this.idleDuration);
  }


  /**
   * detects Movement and sets the idle variable to false
   */
  detectMovement() {
    this.isIdle = false;
    this.resetMovementTimeout();
  }
}
