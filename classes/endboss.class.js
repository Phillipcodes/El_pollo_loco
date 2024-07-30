class Endboss extends MovableObject {
    y = 60
    height = 375;
    width =  245;
    offset = {
      top:  10,     //offset x iist links y top  width is right height is bottom
      bottom: 10,
      left:30,
      right:30
  
    }
   IMAGES_WALKING = ['./img/4_enemie_boss_chicken/1_walk/G1.png','./img/4_enemie_boss_chicken/1_walk/G2.png','./img/4_enemie_boss_chicken/1_walk/G3.png','./img/4_enemie_boss_chicken/1_walk/G4.png'];
    constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x =  800
    this.speed = 0.35 + Math.random() * 0.5
    this.animate();
    }
   
    animate() {
        // this.moveleft();
        setStoppableInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
        
          },210 )
        }
  
}