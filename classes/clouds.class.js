class Cloud extends MovableObject {
    y = 30 ;
    width = 400;
    height = 200;

    constructor(group,index) {
        super().loadImage('./img/5_background/layers/4_clouds/1.png'); 
 
        this.x = this.setStartXEnemieGroup(group,index);
        this.animate();
      
     }


     animate() {    
      this.moveleft();
     }


     moveleft() {
        setInterval(() => {
            this.x -= this.speed
            if(this.x < -450) {
               this.x= 2200
            }
          }, 1000 / 60)
    }
}