class Assets {
  constructor() {
    // all images to download
    this.toLoad = {
      ship1: "/../assets/player/Ship_1.png",
      ship2: "/../assets/player/Ship_2.png",
      ship3: "/../assets/player/Ship_3.png",
      ship4: "/../assets/player/Ship_4.png",
      ship5: "/../assets/player/Ship_5.png",
      turret: "/../assets/player/turretsheet2.png",
      shipExhaustFire: "/../assets/player/shipexhaustFire.png",
      purpleBlob: "/../assets/enemies/purple_blob_sheet.png",
      spaceBg1: "/../assets/spacebg/bg1e.jpg",
      spaceBg2: "/../assets/spacebg/bg2e.jpg",
      spaceBg3: "/../assets/spacebg/bg3e.jpg",
      spaceBg4: "/../assets/spacebg/bg4e.jpg",
      spaceBg5: "/../assets/spacebg/bg5e.jpg",
      spaceBg6: "/../assets/spacebg/bg6e.jpg",
      spaceBg7: "/../assets/spacebg/bg7e.jpg",
      spaceBg8: "/../assets/spacebg/bg8e.jpg",
      spaceBg9: "/../assets/spacebg/bg9e.jpg",
      spaceBg10: "/../assets/spacebg/bg10e.jpg",
      spaceBg11: "/../assets/spacebg/bg11e.jpg",
      spaceBg12: "/../assets/spacebg/bg12e.jpg",
      spaceBg13: "/../assets/spacebg/bg13e.jpg",
      spaceBg14: "/../assets/spacebg/bg14e.jpg",
      spaceBg15: "/../assets/spacebg/bg15e.jpg",
    };
    // container for all images that have been downloaded
    // e.g. {ship1: {image: (ImageEl), isLoaded: true}}
    this.images = {};

    // download each image
    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = { image: img, isLoaded: false };
      img.onload = (e) => (this.images[key].isLoaded = true);
    });
  }

  getSpaceBgImages() {
    return Object.entries(this.images).filter((image) => {
      return image[0].startsWith("spaceBg");
    });
  }
}

// created only 1 instance for the whole game to use
export const assets = new Assets();
