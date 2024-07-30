class BabyChicken extends MovableObject {
    y = 360
    height = 50;
    width =  60;
    // offset = {
    //   top: 10, //offset x iist links y top  width is right height is bottom
    //   bottom: 15,
    //   left: 20,
    //   right: 20,
    // };
   IMAGES_WALKING = ['./img/3_enemies_chicken/chicken_small/1_walk/1_w.png','./img/3_enemies_chicken/chicken_small/1_walk/2_w.png','./img/3_enemies_chicken/chicken_small/1_walk/3_w.png'];
    constructor(group,index) {
       super().loadImage(this.IMAGES_WALKING[0]); 
       this.loadImages(this.IMAGES_WALKING)
       this.x = this.setStartXEnemieGroup(group,index);
       this.speed = 0.45 + Math.random() * 0.4
       this.animate();
    }
   
    animate() {
      setStoppableInterval(() => {

        this.moveleft();
      }, 1000 /60);
      
      setStoppableInterval(() => {

      this.playAnimation(this.IMAGES_WALKING);
      
        }, 210 )
      }

  
}