class Level {
    enemies;
    clouds;
    BackgroundObjects;
    level_end_x = 2200

    constructor(enemies,clouds,BackgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.BackgroundObjects = BackgroundObjects;
    }
}
