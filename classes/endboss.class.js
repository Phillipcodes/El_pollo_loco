class Endboss extends MovableObject {
    y = 60
    height = 375;
    width =  245;
    offset = {
      top:  370,     //offset x iist links y top  width is right height is bottom
      bottom: 320,
      left:225,
      right:230
  
    }
   IMAGES_WALKING = ['./img/4_enemie_boss_chicken/1_walk/G1.png','./img/4_enemie_boss_chicken/1_walk/G2.png','./img/4_enemie_boss_chicken/1_walk/G3.png','./img/4_enemie_boss_chicken/1_walk/G4.png'];
    constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x =  2300
    this.speed = 0.35 + Math.random() * 0.5
    this.animate();
    }
   
    animate() {
        // this.moveleft();
          setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
        
          },210 )
        }
  
}