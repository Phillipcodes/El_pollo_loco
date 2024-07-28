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
}
