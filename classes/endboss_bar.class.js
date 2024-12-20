/**
 * @class
 */
class EndbossBar extends DrawableObject {
  IMAGES_HP = [
    "./img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];
  percentage = 100;


  constructor() {
    super();
    this.loadImages(this.IMAGES_HP);
    this.x = 450;
    this.y = 0;
    this.height = 70;
    this.width = 250;
    this.setPercentage(100);
  }


  /**
   *  set the % of hp
   * @param {number}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HP[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  
  /**
   *  gives back the right img based on percentage
   * @returns  {number}
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
