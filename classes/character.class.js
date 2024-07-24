class Character extends MovableObject {
    height = 275;
    y = 155;
   
    IMAGES_WALKING = ['../img/2_character_pepe/2_walk/W-21.png','../img/2_character_pepe/2_walk/W-22.png','../img/2_character_pepe/2_walk/W-23.png','../img/2_character_pepe/2_walk/W-24.png','../img/2_character_pepe/2_walk/W-25.png','../img/2_character_pepe/2_walk/W-26.png'];
    world;
    speed = 4;
    walking_sound = new Audio('../audio/pepe_walk_sound.mp3');
    
    constructor() {
    super().loadImage('../img/2_character_pepe/2_walk/W-21.png') 
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    
    }

  

    animate() {
        
      setInterval(() => {
        this.walking_sound.pause();
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
       this.x += this.speed 
       this.otherDirection = false;
       
        }
        if(this.world.keyboard.LEFT && this.x > 0) {
          this.x -= this.speed 
          this.otherDirection = true;
           }
        
           if(this.world.keyboard.LEFT ||this.world.keyboard.RIGHT ) {
            this.walking_sound.play();
           }
           this.world.camera_x = -this.x +80

      }, 1000/60);


        setInterval(() => {
            if(this.world.keyboard.RIGHT ||this.world.keyboard.LEFT ) {
              this.playAnimation(this.IMAGES_WALKING)
            }
      
        }, 80 )
      }

    jump() {

    }
} 