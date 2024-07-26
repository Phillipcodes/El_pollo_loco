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

      

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof BabyChicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }

    if (this instanceof Character || this instanceof Chicken || this instanceof BabyChicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.x + this.width - this.offset.right - (this.x + this.offset.left), this.y + this.height - this.offset.bottom - (this.y + this.offset.top));
      ctx.stroke();
    }
  }
}