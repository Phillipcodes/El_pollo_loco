class Coin extends Objects {
    constructor(group,index) { 
        super().loadImage('../img/8_coin/coin_1.png'); 
        this.x = this.setCollectablesPoint(group,index)
        this.y = 200
      
        
      
     }
}