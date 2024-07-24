class Level {
    enemies;
    clouds;
    BackgroundObjects;
    coins;
    level_end_x = 2200

    constructor(enemies,clouds,BackgroundObjects,coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.BackgroundObjects = BackgroundObjects;
        this.coins = coins
    }
}
