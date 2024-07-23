class BabyChicken extends MovableObject {
    y = 360
    height = 55;
    width =  65;
   IMAGES_WALKING = ['../img/3_enemies_chicken/chicken_small/1_walk/1_w.png','../img/3_enemies_chicken/chicken_small/1_walk/2_w.png','../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'];
    constructor(group,index) {
       super().loadImage(this.IMAGES_WALKING[0]); 
       this.loadImages(this.IMAGES_WALKING)
       this.x = this.setStartXEnemieGroup(group,index);
       this.speed = 0.45 + Math.random() * 0.4
       this.animate();
    }
   
    animate() {
      this.moveleft();
        setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      
        }, 210 )
      }

  
}