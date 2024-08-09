/**
 * @class
 */
class Level {
  enemies;
  clouds;
  BackgroundObjects;
  coins;
  bottles;
  world;
  level_end_x = 2200;


  constructor(enemies, clouds, BackgroundObjects, coins, bottles, world) {
    this.enemies = enemies.map((enemy) => {
      if (enemy instanceof Endboss) {
        return new Endboss(world); // Übergebe die World-Instanz hier
      }
      return enemy;
    });
    this.enemies = enemies;
    this.clouds = clouds;
    this.BackgroundObjects = BackgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }

  
  /**
   * Removes enemies after 3 seconds
   * @param {enemies} enemy
   */
  removeEnemy(enemy) {
    setTimeout(() => {
      this.enemies = this.enemies.filter((e) => e !== enemy);
    }, 3000);
  }
}
