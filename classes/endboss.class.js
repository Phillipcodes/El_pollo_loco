class Endboss extends MovableObject {
    y = 60
    height = 375;
    width =  245;
    offset = {
      top:  10,     //offset x iist links y top  width is right height is bottom
      bottom: 10,
      left:30,
      right:30
  
    }
    world;
    firstContact = false;
    isDead = false;
    isDeadFlag = false;
    hurt_sound = SoundManager.getSound('endBossScream' , 0.4)
   IMAGES_ALERT = ['./img/4_enemie_boss_chicken/2_alert/G5.png','./img/4_enemie_boss_chicken/2_alert/G6.png','./img/4_enemie_boss_chicken/2_alert/G7.png','./img/4_enemie_boss_chicken/2_alert/G8.png','./img/4_enemie_boss_chicken/2_alert/G9.png','./img/4_enemie_boss_chicken/2_alert/G10.png','./img/4_enemie_boss_chicken/2_alert/G11.png','./img/4_enemie_boss_chicken/2_alert/G12.png',]
   IMAGES_WALKING = ['./img/4_enemie_boss_chicken/1_walk/G1.png','./img/4_enemie_boss_chicken/1_walk/G2.png','./img/4_enemie_boss_chicken/1_walk/G3.png','./img/4_enemie_boss_chicken/1_walk/G4.png'];
   IMAGES_HURT = ['./img/4_enemie_boss_chicken/4_hurt/G21.png','./img/4_enemie_boss_chicken/4_hurt/G22.png','./img/4_enemie_boss_chicken/4_hurt/G23.png']
   IMAGES_DEAD = ['./img/4_enemie_boss_chicken/5_dead/G24.png','./img/4_enemie_boss_chicken/5_dead/G25.png','./img/4_enemie_boss_chicken/5_dead/G26.png']
   IMAGES_ATTACK = ['./img/4_enemie_boss_chicken/3_attack/G13.png',
                    './img/4_enemie_boss_chicken/3_attack/G14.png',
                    './img/4_enemie_boss_chicken/3_attack/G15.png',
                    './img/4_enemie_boss_chicken/3_attack/G16.png',
                    './img/4_enemie_boss_chicken/3_attack/G17.png',
                    './img/4_enemie_boss_chicken/3_attack/G18.png',
                    './img/4_enemie_boss_chicken/3_attack/G19.png',
                    './img/4_enemie_boss_chicken/3_attack/G20.png',
   ]
    constructor(world) {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.world = world
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT)
    this.loadImages(this.IMAGES_DEAD)
    this.loadImages(this.IMAGES_ALERT)
    this.x =  2200
    this.speed = 0.9 + Math.random() * 0.5
    
    this.animate();
    }
   
     animate() {
      
      let i = 0
    setStoppableInterval(() => {
      this.setMovement()
    }, 1000/60);
    setStoppableInterval(() => {
 
     if(i < this.IMAGES_ALERT.length) {
        this.playAnimation(this.IMAGES_ALERT)
        i++
      }else {
        this.setMovementAnimation();
      }
      if(world.character.x> 1650 && !this.firstContact) {  // vllt eine attackk erstellen wo er kurz stehen bleibt und seine attack animation bekkommt und dann 3 sekkunden lang schnell rennt 
        i = 0 
        this.firstContact= true
      }
 
    }, 180);
    setStoppableInterval(() => {
      this.handlePain();
    }, 180);
      setStoppableInterval(() => {
        this.handleDeath() 
      }, 400);
  
  }

  
  handleAlert() {
    let i = 0
    if(i >= this.IMAGES_ALERT.length) {
    this.playAnimation(this.IMAGES_ALERT)
     i++
  }
 if(world.character.x > 1600) {
  i = 0
  this.firstContact = true
  }
  }
  

  handleDeath() {
    if(this.isDead ) {
      if (!this.isDeadFlag) {
    this.isDeadFlag = true;
    this.playAnimation(this.IMAGES_DEAD)
    endBossDead()
      }
 }
  }

  handlePain() {
    if(this.isHurt()) {  
      if (!this.isDeadFlag) {
      this.playAnimation(this.IMAGES_HURT);
      this.hurt_sound.play()
      this.speed += 0.3
      }
    }
  }

  setMovement() {
    if (this.isMoving) {
      if (!this.isDeadFlag) {
      this.moveleft(); 
      }
    }
  }

  setMovementAnimation() {
    if (!this.isDeadFlag) {
      this.playAnimation(this.IMAGES_WALKING);

      }
  }

  startMoving() {
    this.isMoving = true; 
  }


  shouldRemove() {
    return this.isDead;
  }


  die() {
    this.isDead = true;
    this.speed = 0; 
    // this.dead_sound.play()
  
    
  }
}