class Character extends MovableObject {
    height = 275;
    y = 150;   //standard valuve 155
   
    IMAGES_WALKING = ['../img/2_character_pepe/2_walk/W-21.png','../img/2_character_pepe/2_walk/W-22.png','../img/2_character_pepe/2_walk/W-23.png','../img/2_character_pepe/2_walk/W-24.png','../img/2_character_pepe/2_walk/W-25.png','../img/2_character_pepe/2_walk/W-26.png'];
    IMAGES_SLEEPING = ['../img/2_character_pepe/1_idle/long_idle/I-11.png','../img/2_character_pepe/1_idle/long_idle/I-12.png','../img/2_character_pepe/1_idle/long_idle/I-13.png','../img/2_character_pepe/1_idle/long_idle/I-14.png','../img/2_character_pepe/1_idle/long_idle/I-15.png','../img/2_character_pepe/1_idle/long_idle/I-16.png','../img/2_character_pepe/1_idle/long_idle/I-17.png','../img/2_character_pepe/1_idle/long_idle/I-18.png','../img/2_character_pepe/1_idle/long_idle/I-19.png','../img/2_character_pepe/1_idle/long_idle/I-20.png',]
    IMAGES_JUMPING = ['../img/2_character_pepe/3_jump/J-31.png','../img/2_character_pepe/3_jump/J-32.png','../img/2_character_pepe/3_jump/J-33.png','../img/2_character_pepe/3_jump/J-34.png','../img/2_character_pepe/3_jump/J-35.png','../img/2_character_pepe/3_jump/J-36.png','../img/2_character_pepe/3_jump/J-37.png','../img/2_character_pepe/3_jump/J-38.png','../img/2_character_pepe/3_jump/J-39.png',]
    world;
    speed = 4;
    walking_sound = new Audio('../audio/pepe_walk_sound.mp3');
    idle_sound = new Audio('../audio/03 ASLEEP_ESP_SOUND V2.mp3')
    jump_sound = new Audio('../audio/01 JUMP_ESP_SOUND.mp3')
    constructor() {
    super().loadImage('../img/2_character_pepe/2_walk/W-21.png') 
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_JUMPING );
    this.applyGravity();
    this.animate();
    
    }

  

    animate() {
      setInterval(() => {
       this.handleCharacter()
      }, 1000 / 60);
      setInterval(() => {
        if(this.isAboveGround()) {
          this.playAnimation(this.IMAGES_JUMPING);
        } else {

         if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
              this.playAnimation(this.IMAGES_WALKING);
          }
        }
      }, 80);
      setInterval(()=> {
        if (this.isSleeping) {
          this.playAnimation(this.IMAGES_SLEEPING);
        }
      }, 200)
  }


  handleCharacter() {
      this.handleMovement();
      this.handleIdleSound();  // Call the new function for handling the idle sound
      this.jump();
      this.world.camera_x = -this.x + 80;
  }
  


  handleMovement() {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.otherDirection = false;
          this.moveRight(); // Character is moving, not sleeping
          this.resetMovementTimeout();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
          this.otherDirection = true;
          this.moveleft();  // Character is moving, not sleeping
          this.resetMovementTimeout();
      }
      
      // Check if character is moving and play walking sound
      if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
          if (this.walking_sound.paused) {
              this.walking_sound.currentTime = 0;  // Reset sound to start
              this.walking_sound.play();
          }
      } else {
          this.walking_sound.pause();
      }
  }

  handleIdleSound() {
      if (this.isSleeping) {
          if (this.idle_sound.paused) {
              this.idle_sound.currentTime = 0;  // Reset sound to start
              this.idle_sound.play();
          }
      } else {
          this.idle_sound.pause();
      }
  }

  resetMovementTimeout() {
      // Clear the previous timeout if it exists
      if (this.movementTimeout) {
          clearTimeout(this.movementTimeout);
      }

      // Set a new timeout to set isSleeping to true after 15 seconds
      this.movementTimeout = setTimeout(() => {
          this.isSleeping = true;  // Set sleeping state after inactivity
          
          this.playAnimation(this.IMAGES_SLEEPING);
      }, 10000);
  }

 
    
} 