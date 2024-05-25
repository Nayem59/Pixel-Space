class Assets {
  constructor() {
    // all images to download
    this.toLoad = {
      ship1: "/../assets/Ship_1.png",
      ship2: "/../assets/Ship_2.png",
      ship3: "/../assets/Ship_3.png",
      ship4: "/../assets/Ship_4.png",
      ship5: "/../assets/Ship_5.png",
      turret: "/../assets/turret.png",
      shipExhaustFire: "/../assets/shipexhaustFire.png",
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
