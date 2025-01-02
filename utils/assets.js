class Assets {
  constructor() {
    // all images to download
    this.toLoad = {
      ship1: "/../assets/player/player.png",
      ship2: "/../assets/player/Ship_2.png",
      ship3: "/../assets/player/Ship_3.png",
      ship4: "/../assets/player/Ship_4.png",
      ship5: "/../assets/player/Ship_5.png",
      turret: "/../assets/player/turretsheet2.png",
      shield: "/../assets/player/shield.png",
      shipExhaustFire: "/../assets/player/shipexhaustFire.png",
      missile: "/../assets/player/missile.png",
      explosion1: "/../assets/player/explosion1.png",
      explosion2: "/../assets/player/explosion2.png",
      purpleBlob: "/../assets/enemies/purple_blob_sheet.png",
      squidMonster: "/../assets/enemies/squid_sheet.png",
      live: "/../assets/ui/health.png",
      skillUI: "/../assets/ui/skillUI.png",
      exclam: "/../assets/ui/exclamationMark.png",
      menuUI: "/../assets/ui/menuUI.png",
      gem: "/../assets/collectables/gem2.png",
      coin: "/../assets/collectables/coin.png",
      coinUI: "/../assets/collectables/coinUI.png",
      gemUI: "/../assets/collectables/gemUI.png",
      coinEffect: "/../assets/collectables/coinEffect.png",
      gemEffect: "/../assets/collectables/gemEffect.png",
      spaceBg1: "/../assets/bge/bg1e.jpg",
      spaceBg2: "/../assets/bge/bg2e.jpg",
      spaceBg3: "/../assets/bge/bg3e.jpg",
      spaceBg4: "/../assets/bge/bg4e.jpg",
      spaceBg5: "/../assets/bge/bg5e.jpg",
      spaceBg6: "/../assets/bge/bg6e.jpg",
      spaceBg7: "/../assets/bge/bg7e.jpg",
      spaceBg8: "/../assets/bge/bg8e.jpg",
      spaceBg9: "/../assets/bge/bg9e.jpg",
      spaceBg10: "/../assets/bge/bg10e.jpg",
      spaceBg11: "/../assets/bge/bg11e.jpg",
      spaceBg12: "/../assets/bge/bg12e.jpg",
      spaceBg13: "/../assets/bge/bg13e.jpg",
      spaceBg14: "/../assets/bge/bg14e.jpg",
      spaceBg15: "/../assets/bge/bg15e.jpg",
      yellowPlanet: "/../assets/planets/yellowPlanet.png",
      spaceStation1: "/../assets/spaceStations/spaceStation1.png",
      stationUI: "/../assets/spaceStations/stationUI.png",
      healthUpgrade: "/../assets/spaceStations/healthUpgrade.png",
      damageUpgrade: "/../assets/spaceStations/damageUpgrade.png",
      speedUpgrade: "/../assets/spaceStations/speedUpgrade.png",
      greenTick: "/../assets/spaceStations/greenTick.png",
    };
    // container for all images that have been downloaded
    // e.g. {ship1: {image: (ImageEl), isLoaded: true}}
    this.images = {};
    this.loadingPromises = [];

    // download each image
    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = { image: img, isLoaded: false };

      const promise = new Promise((resolve) => {
        img.onload = () => {
          this.images[key].isLoaded = true;
          resolve();
        };
      });

      this.loadingPromises.push(promise);
    });
  }

  loadAll() {
    return Promise.all(this.loadingPromises);
  }

  getSpaceBgImages() {
    return Object.entries(this.images).filter((image) => {
      return image[0].startsWith("spaceBg");
    });
  }
}

// created only 1 instance for the whole game to use
export const assets = new Assets();
