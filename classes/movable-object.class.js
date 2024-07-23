class MovableObject {
    x = 120;
    y = 275;
    img;
    height = 150;
    width = 100;
    speed = 0.12
    imageCache = {
    };
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image()
            img.src = path
           this.imageCache[path] = img
        });
       
    }


    moveRight() {
        setInterval(() => {
            this.x += this.speed
            if(this.x < -300) {
               this.x= 720
            }
          }, 1000 / 60)
    }

    moveleft() {
        setInterval(() => {
            this.x -= this.speed
            if(this.x < -300) {
               this.x= 720
            }
          }, 1000 / 60)
    }

}