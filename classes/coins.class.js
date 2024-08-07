class Coin extends DrawableObject {

   IMAGES_COIN = ['./img/8_coin/coin_1.png','./img/8_coin/coin_2.png']
    img;
    height = 160;
    width = 130;
    offset = {
        top: 50, //offset x iist links y top  width is right height is bottom
        bottom: 50,
        left: 37,
        right: 37,
      };


    constructor(group,index) { 
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN)
        this.x = this.setCollectablesPoint(group,index)
        this.y = 50 * Math.random()  +30
        this.animate() 
        
     }

     
     animate() {
      setStoppableInterval(() => {
        this.playAnimation(this.IMAGES_COIN)
      }, 620);
      
     }
} 