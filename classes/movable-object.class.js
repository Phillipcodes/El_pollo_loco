class MovableObject {
    x = 120;
    y = 275;
    img;
    height = 150;
    width = 100;
    imageCache = {
    };


    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    loadImages(arr) {
        arr.array.forEach(path => {
            let img = new Image()
            img.src = path
            imageCache[path] = path
        });
       
    }


    moveRight() {
        console.log('moving right')
    }

    moveleft() {
        
    }

}