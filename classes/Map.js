class Map {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
  }
  draw(c, camera) {
    c.drawImage(
      this.image,
      camera.x,
      camera.y,
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
