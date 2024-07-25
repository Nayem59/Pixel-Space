class TileMap {
  constructor(images, tileWidth, tileHeight, tilesCountX, tilesCountY) {
    this.images = images;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tilesCountX = tilesCountX;
    this.tilesCountY = tilesCountY;
    this.tileMap = new Map();
    this.generateTileMap();
  }

  generateTileMap() {
    let tileCount = 0;
    for (let y = 0; y < this.tilesCountY; y++) {
      for (let x = 0; x < this.tilesCountX; x++) {
        this.tileMap.set(tileCount, {
          img: this.images[tileCount][1].image,
          x: x * this.tileWidth,
          y: y * this.tileHeight,
        });
        tileCount++;
      }
    }
  }
}

export default TileMap;
