/**
 * @class
 */
class StatusBar extends DrawableObject {
    IMAGES_HP = ['./img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
              './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
              './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
              './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
              './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
              './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];
    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_HP)
        this.x =15
        this.y = -15
        this.height = 80
        this.width = 250
        this.setPercentage(100);
    }


    /**
     * set percentage based on current health
     * @param {number}
     */
    setPercentage(percentage) {
        this.percentage = percentage
        let path = this.IMAGES_HP[this.resolveImageIndex()];
        this.img = this.imageCache[path];
   
    }

    
    /**
     * gives back img based on percentage value
     * @returns {number}
     */
    resolveImageIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        }else if (this.percentage > 60) {
            return 3;
        }
        else if (this.percentage > 40) {
            return 2;
        }
        else if (this.percentage > 20) {
            return 1;
        }else   {
            return 0;
        }
    }
}
