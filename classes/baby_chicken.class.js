class BabyChicken extends MovableObject {
  y = 380;
  height = 50;
  width = 60;
  speedY = 2;
  isDead = false;

  DMG = 5
  IMAGES_WALKING = ["./img/3_enemies_chicken/chicken_small/1_walk/1_w.png", "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png", "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png"];
  IMAGES_DEAD = ["./img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  dead_sound = SoundManager.getSound("chickenDead", 0.4);

  
  constructor(group, index) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = this.setStartXEnemieGroup(group, index);
    this.speed = 0.45 + Math.random() * 0.4;
    this.inAir = false;
    this.applyGravity();
    this.animate();
  }


  /**
   * animates chicks movement
   */
  animate() {
    setStoppableInterval(() => {
      if (!this.isDead) {
        this.moveleft();
      }
    }, 1000 / 60);
    setStoppableInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 210);
    setStoppableInterval(() => {
      if (!this.isDead && !this.isAboveGround()) {
        this.jump(9);
      }
    }, 1500);
  }

/**
 *  booleans to true so we can handle with his dead
 * @returns {boolean}
 */
  shouldRemove() {
    return this.isDead;
  }

/**
 * sets death of the enemie
 */
  die() {
    this.isDead = true;
    this.speed = 0; // Stoppe die Bewegung
    this.loadImage(this.IMAGES_DEAD[0]); // Bild für das tote Huhn
    this.dead_sound.play();
  }
}
