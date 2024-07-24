const level1 = new Level(
    [
        new Chicken(1,0),
        new Chicken(1,1),
        new Chicken(1,2),
        new Chicken(2,0),
        new Chicken(2,1),
        new Chicken(2,2),
        new Chicken(3,0),
        new Chicken(3,1),
        new Chicken(4,0),
        new Chicken(4,1),
        new BabyChicken(1,0),
        new BabyChicken(1,1),
        new BabyChicken(1,2),
        new BabyChicken(3,0),
        new BabyChicken(3,1),
        new BabyChicken(3,2),
        new Endboss(),
    ],
    [
        new Cloud(1,0),
        new Cloud(2,0),
        new Cloud(3,0),
        new Cloud(4,0),
        new Cloud(5,0),
    ],

    [
        new BackgroundObject('../img/5_background/layers/air.png' , -719),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -719 ),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -719 ),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -719 ),
    
        new BackgroundObject('../img/5_background/layers/air.png' , 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0 ),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0 ),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0 ),
    
        new BackgroundObject('../img/5_background/layers/air.png' , 719),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719 ),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719 ),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719 ),
    
        new BackgroundObject('../img/5_background/layers/air.png' , 719 *2),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 719 *2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719 *2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719 *2),
    
        new BackgroundObject('../img/5_background/layers/air.png' , 719 *3),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719 *3),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719 *3),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719 *3),
    ],

    [
        new Coin(1,0),
        new Coin(2,0),
        new Coin(3,0),
        new Coin(4,0),
        new Coin(5,0),
    ],
);