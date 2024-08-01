class BabyChicken extends MovableObject {
    y = 360
    height = 50;
    width =  60;
 
    isDead = false;
   IMAGES_WALKING = ['./img/3_enemies_chicken/chicken_small/1_walk/1_w.png','./img/3_enemies_chicken/chicken_small/1_walk/2_w.png','./img/3_enemies_chicken/chicken_small/1_walk/3_w.png'];
    IMAGES_DEAD = ['./img/3_enemies_chicken/chicken_small/2_dead/dead.png']
    dead_sound = SoundManager.getSound('chickenDead');
    constructor(group,index) {
       super().loadImage(this.IMAGES_WALKING[0]); 
       this.loadImages(this.IMAGES_WALKING)
       this.x = this.setStartXEnemieGroup(group,index);
       this.speed = 0.45 + Math.random() * 0.4
       this.animate();
    }
   
    animate() {
      
      setStoppableInterval(() => {
        if(!this.isDead) {
          this.moveleft();
        }
        
      }, 1000 /60);
     
      setStoppableInterval(() => {
        if(!this.isDead) {
      this.playAnimation(this.IMAGES_WALKING);
       
     } }, 210 )
        
      }
      
    
      shouldRemove() {
        return this.isDead;
      }
  

      die() {
        this.isDead = true;
        this.speed = 0; // Stoppe die Bewegung
        this.loadImage(this.IMAGES_DEAD[0]); // Bild für das tote Huhn
        this.dead_sound.play()
        
      }
}