class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 275;
    height = 150;
    width = 100;


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
      }


      loadImages(arr) {
        arr.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = img;
        });
      }

      

      isColliding(mo) {
        return (
          this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
          this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
          this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
          this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
      }

  drawFrame(ctx) {
    if (this.setDrawFrameInstance()) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }

    if (this.setDrawFrameInstance()) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.x + this.width - this.offset.right - (this.x + this.offset.left), this.y + this.height - this.offset.bottom - (this.y + this.offset.top));
      ctx.stroke();
    }
  }

  setCollectablesPoint(group, index) {
    const groupSpacing = 550; // Abstand zwischen den Gruppen
    const innerGroupSpacing = 150; // Abstand zwischen den Hühnern innerhalb der Gruppe
    const baseX = 400 + (group - 1) * groupSpacing; // Basisposition je nach Gruppe
    const offset = index * innerGroupSpacing; // Abstand zwischen den Hühnern
    return baseX + offset;
  }


  setDrawFrameInstance() {
   return this instanceof Character || this instanceof Chicken || this instanceof BabyChicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle
  }


  collectItem(item,array) {
    if(this.isColliding(item)) {
      let index = array.indexOf(item);
      if (index > -1) {
        array.splice(index,1)
        
      }
    }
  }

}