/**
 * @class
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 275;
  height = 150;
  width = 100;
  isDeadFlag = false;


  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  /**
   * loads image and sets the variable img to the right path
   * @param {string} path - The path or URL of the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }


  /**
   * Loads an array of images and stores them in an image cache.
   * Each image is created and its source is set based on the paths provided in the array.
   * The images are then cached using their paths as keys.
   *
   * @param {string[]} arr - An array of strings where each string is the path or URL of an image to load.
   * @returns {void}
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }


  /**
   * Checks for collision between this object and another movable object.
   * The collision detection is based on the position and dimensions of both objects, taking into account offsets.
   *
   * @param {MovableObject} mo - The other movable object to check for collision with. This object should have properties like `x`, `y`, `width`, `height`, and `offset`.
   * @returns {boolean} `true` if the objects are colliding, `false` otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }


  /**
   * Checks if this object is colliding with another movable object from above.
   * This method determines if there is a vertical overlap (with a buffer) and checks for horizontal overlap.
   *
   * @param {MovableObject} mo - The other movable object to check for collision with. This object should have properties like `x`, `y`, `width`, `height`, and `offset`.
   * @returns {boolean} `true` if this object is colliding with the other object from above, `false` otherwise.
   */
  isCollidingAbove(mo) {
    const charBottom = this.y + this.height - this.offset.bottom;
    const moTop = mo.y + mo.offset.top;
    const verticalDistance = charBottom - moTop;
    const collisionBuffer = 25;
    const isAbove = verticalDistance <= collisionBuffer && verticalDistance >= -collisionBuffer;
    const isHorizontallyOverlapping = this.x + this.width - this.offset.right > mo.x + mo.offset.left && this.x + this.offset.left < mo.x + mo.width - mo.offset.right;

    return isAbove && isHorizontallyOverlapping;
  }
  

  isFalling() {
    
    return this.speedY < 0;
  }


  /**
   * collects item when colliding
   * @param {object} item
   * @param {Array<Object>} array
   */
  collectItem(item, array) {
    if (this.isColliding(item)) {
      let index = array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
  }


  /**
   * Plays the animation by cycling through the provided array of image paths.
   * Updates the `img` property to the current image based on the animation frame.
   * If the animation reaches the last frame and the `isDeadFlag` is set, it stops at the last frame.
   *
   * @param {string[]} images - An array of strings where each string is a path or URL to an image for the animation.
   * @returns {void}
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    if (i === images.length - 1 && this.isDeadFlag) {
      this.currentImage = i; // Setze das Bild auf das letzte Bild
    }
  }


  /**
   * gives enimies diffrent placements based on the group and index
   * @param {number} group
   * @param {number} index
   * @returns {number}
   */
  setStartXEnemieGroup(group, index) {
    const groupSpacing = 550 * Math.random() + 115; // Abstand zwischen den Gruppen
    const innerGroupSpacing = 205; // Abstand zwischen den Hühnern innerhalb der Gruppe
    const baseX = 400 + (group - 1) * groupSpacing; // Basisposition je nach Gruppe
    const offset = index * innerGroupSpacing + 25; // Abstand zwischen den Hühnern
    return baseX + offset;
  }

  
  /**
   * set collectable objects cordinates based on there group and index
   * @param {number} group
   * @param {number} index
   * @returns {number}
   */
  setCollectablesPoint(group, index) {
    const groupSpacing = 420; // Abstand zwischen den Gruppen
    const innerGroupSpacing = 120; // Abstand zwischen den Hühnern innerhalb der Gruppe
    const baseX = 400 + (group - 1) * groupSpacing; // Basisposition je nach Gruppe
    const offset = index * innerGroupSpacing; // Abstand zwischen den Hühnern
    return baseX + offset;
  }
}
