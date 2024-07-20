class Cloud extends MovableObject {
    y = 30 ;
    width = 400;
    height = 200;
    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png'); 
 
        this.x = Math.random() * 500
        this.animate();
      
     }

     animate() {
       setInterval(() => {
         this.x -= 0.12;
         if(this.x < -300) {
            this.x= 720
         }
       }, 1000 / 60)
     }
}