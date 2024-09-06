import { camera, enemies, map, player } from "../main.js";
import { c } from "../utils/canvas.js";

class MiniMap {
  constructor(canvasWidth, canvasHeight) {
    this.width = (2048 * 5) / 32;
    this.height = (2048 * 3) / 32;
    this.scale = 0.03125; // Scale of the mini-map (mini-map size / background size)
    this.positionX = canvasWidth - this.width - 10;
    this.positionY = canvasHeight - this.height - 10;
  }

  draw() {
    // Draw the mini-map
    c.strokeStyle = "#7DF9FF";
    c.strokeRect(
      this.positionX - 1,
      this.positionY - 1,
      this.width + 2,
      this.height + 2
    );

    // Draw the scaled-down background on the mini-map
    c.save();
    if (
      player.x - camera.x > this.positionX &&
      player.y - camera.y > this.positionY
    ) {
      c.globalAlpha = 0.5;
    }

    for (let row = 0; row < map.tilesCountY; row++) {
      for (let col = 0; col < map.tilesCountX; col++) {
        const tileIndex = row * map.tilesCountX + col;
        const tile = map.images[tileIndex];
        if (tile && tile.isLoaded) {
          const miniMapTileX =
            this.positionX + col * map.tileWidth * this.scale;
          const miniMapTileY =
            this.positionY + row * map.tileHeight * this.scale;
          c.drawImage(
            tile.image,
            miniMapTileX,
            miniMapTileY,
            map.tileWidth * this.scale,
            map.tileHeight * this.scale
          );
        }
      }
    }
    c.restore();

    // Draw the player on the mini-map
    const miniMapPlayerX = this.positionX + player.x * this.scale;
    const miniMapPlayerY = this.positionY + player.y * this.scale;
    c.fillStyle = "#7DF9FF";
    c.beginPath();
    c.arc(
      miniMapPlayerX,
      miniMapPlayerY,
      player.radius * 0.2,
      0,
      Math.PI * 2,
      false
    );
    c.fill();

    // Draw the enemies on the mini-map
    enemies.forEach((enemy) => {
      const miniMapEnemyX = this.positionX + enemy.x * this.scale;
      const miniMapEnemyY = this.positionY + enemy.y * this.scale;
      c.fillStyle = "red";
      c.beginPath();
      c.arc(
        miniMapEnemyX,
        miniMapEnemyY,
        enemy.radius * 0.1,
        0,
        Math.PI * 2,
        false
      );
      c.fill();
    });
  }
}

export default MiniMap;
