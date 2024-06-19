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
      spaceBg: "/../assets/spacebg/bg1e.jpg",
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
}

// created only 1 instance for the whole game to use
export const assets = new Assets();
