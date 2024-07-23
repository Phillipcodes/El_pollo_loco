class MovableObject {
    x = 120;
    y = 275;
    img;
    height = 150;
    width = 100;
    speed = 0.12
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
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

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }

    setStartXEnemieGroup(group, index) {
        const groupSpacing =  550; // Abstand zwischen den Gruppen
        const innerGroupSpacing = 150; // Abstand zwischen den Hühnern innerhalb der Gruppe
        const baseX = 400 + (group - 1) * groupSpacing; // Basisposition je nach Gruppe
        const offset = index * innerGroupSpacing; // Abstand zwischen den Hühnern
        return baseX + offset;
    }


}