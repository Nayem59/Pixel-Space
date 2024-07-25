class Map {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.mapPosX = 0;
    this.mapPosY = 0;
  }
  draw(c, camera) {
    c.drawImage(
      this.image,
      camera.x - this.mapPosX,
      camera.y - this.mapPosY,
      camera.width,
      camera.height,
      0,
      0,
      camera.width,
      camera.height
    );
  }
}

export default Map;
