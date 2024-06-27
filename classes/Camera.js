class Camera {
  constructor(width, height, map) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.map = map;
    // Define margins within which the player can move freely
    this.marginX = width / 10;
    this.marginY = height / 6;
  }

  update(player) {
    // Check if the player is outside the horizontal margins
    if (player.x < this.x + this.marginX) {
      this.x = player.x - this.marginX;
    } else if (player.x > this.x + this.width - this.marginX) {
      this.x = player.x - this.width + this.marginX;
    }

    // Check if the player is outside the vertical margins
    if (player.y < this.y + this.marginY) {
      this.y = player.y - this.marginY;
    } else if (player.y > this.y + this.height - this.marginY) {
      this.y = player.y - this.height + this.marginY;
    }

    // Clamp camera position to map boundaries
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.width > this.map.width)
      this.x = this.map.width - this.width;
    if (this.y + this.height > this.map.height)
      this.y = this.map.height - this.height;
  }
}

export default Camera;
