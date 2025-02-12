class SoundAssets {
    constructor() {
        this.snakeEatAsset = new Audio('assets/sound/plop.mp3');
        this.superFoodSpawnAsset = new Audio('assets/sound/superfood spawn.wav');
    }


    snakeEat() {
        this.snakeEatAsset.play();
    }


    superFoodSpawn() {
        this.superFoodSpawnAsset.play();
    }
}

const SOUND_ASSETS = new SoundAssets();