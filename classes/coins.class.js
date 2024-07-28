class Coin extends DrawableObject {

   
    img;
    height = 150;
    width = 120;

    offset = {
        top: 50, //offset x iist links y top  width is right height is bottom
        bottom: 50,
        left: 37,
        right: 37,
      };

    constructor(group,index) { 
        super().loadImage('./img/8_coin/coin_1.png'); 
        this.x = this.setCollectablesPoint(group,index)
        this.y = 200
        
        
      
     }

    
} 