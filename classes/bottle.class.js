class Bottle extends DrawableObject {
    img;
    height = 90;
    width = 80;
    offset = {
        top: 20, //offset x iist links y top  width is right height is bottom
        bottom:10,
        left: 32,
        right: 10,
      };

      
    constructor(group,index) { 
        super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); 
        this.x = this.setCollectablesPoint(group,index) +200
        this.y = 325 
     }
}