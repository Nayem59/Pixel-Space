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
    this.damageDuration = 0;
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
    if (this.x + this.width > this.map.tilesCountX * this.map.tileWidth)
      this.x = this.map.tilesCountX * this.map.tileWidth - this.width;
    if (this.y + this.height > this.map.tilesCountY * this.map.tileHeight)
      this.y = this.map.tilesCountY * this.map.tileHeight - this.height;
  }

  showDamage(c) {
    if (this.damageDuration > 0) {
      const gradient = c.createRadialGradient(
        this.width / 2,
        this.height / 2,
        this.width / 3,
        this.width / 2,
        this.height / 2,
        this.width / 2
      );
      gradient.addColorStop(0, "rgb(255, 0, 0, 0)");
      gradient.addColorStop(1, "rgb(255, 0, 0, 0.7)");
      c.save();
      c.globalAlpha = this.damageDuration / 10;
      c.fillStyle = gradient;
      c.fillRect(0, 0, this.width, this.height);
      c.restore();
      this.damageDuration--;
    }
  }
}

export default Camera;
