class TileMap {
  constructor(images, tileWidth, tileHeight, tilesCountX, tilesCountY) {
    this.images = images.map((item) => item[1]);
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tilesCountX = tilesCountX;
    this.tilesCountY = tilesCountY;
    // this.tileMap = new Map();
    // this.generateTileMap();
  }

  // generateTileMap() {
  //   let tileCount = 0;
  //   for (let y = 0; y < this.tilesCountY; y++) {
  //     for (let x = 0; x < this.tilesCountX; x++) {
  //       this.tileMap.set(tileCount, {
  //         img: this.images[tileCount][1].image,
  //         x: x * this.tileWidth,
  //         y: y * this.tileHeight,
  //       });
  //       tileCount++;
  //     }
  //   }
  // }

  draw(c, camera) {
    const startCol = Math.floor(camera.x / this.tileWidth);
    const endCol = startCol + Math.ceil(camera.width / this.tileWidth);
    const startRow = Math.floor(camera.y / this.tileHeight);
    const endRow = startRow + Math.ceil(camera.height / this.tileHeight);
    const offsetX = -camera.x % this.tileWidth;
    const offsetY = -camera.y % this.tileHeight;

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const tileIndex =
          (row % this.tilesCountY) * this.tilesCountX +
          (col % this.tilesCountX);
        const tile = this.images[tileIndex];
        if (tile && tile.isLoaded) {
          c.drawImage(
            tile.image,
            offsetX + (col - startCol) * this.tileWidth,
            offsetY + (row - startRow) * this.tileHeight,
            this.tileWidth,
            this.tileHeight
          );
        }
      }
    }
  }
}

export default TileMap;
