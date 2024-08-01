class Level {
    enemies;
    clouds;
    BackgroundObjects;
    coins;
    bottles;
    level_end_x = 2200

    constructor(enemies,clouds,BackgroundObjects,coins,bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.BackgroundObjects = BackgroundObjects;
        this.coins = coins
        this.bottles = bottles
    }
    // removeEnemy(enemyToRemove) {
    //     setTimeout(() => {
    //         this.enemies = this.enemies.filter(enemy => enemy !== enemyToRemove);
    //     }, 1000);
        
    // }
    removeEnemy(enemy) {
        setTimeout(() => {
            this.enemies = this.enemies.filter(e => e !== enemy);
        }, 3000);
        
      }
  
    
    
}
