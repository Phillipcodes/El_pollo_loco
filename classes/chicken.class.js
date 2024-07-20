class Chicken extends MovableObject {
    y = 340
    height = 75;
    width =  90;

    constructor() {
       super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); 

       this.x = 200 + Math.random() * 500;
       this.animate();
    }
   
    animate() {
        setInterval(() => {
          this.x -= 0.55;
          if(this.x < -90) {
             this.x= 720
          }
        }, 1000 / 60)
      }

}