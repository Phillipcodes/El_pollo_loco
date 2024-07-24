class Chicken extends MovableObject {
    y = 340
    height = 75;
    width =  90;
   IMAGES_WALKING = ['../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png','../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png','../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'];
    constructor(group,index) {
       super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); 
       this.loadImages(this.IMAGES_WALKING)
       this.x = this.setStartXEnemieGroup(group,index);
       this.speed = 0.45 + Math.random() * 0.4
       this.animate();
    }
   
    animate() {
      setInterval(() => {
        this.moveleft();
      }, 1000 /60);
     
        setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      
        }, 210 )
      }

  
  


}