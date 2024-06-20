import { map, player } from "../main.js";
import { c } from "../utils/canvas.js";

class MiniMap {
  constructor(canvasWidth, canvasHeight) {
    this.width = 256;
    this.height = 256;
    this.scale = 0.125; // Scale of the mini-map (mini-map size / background size)
    this.positionX = canvasWidth - this.width - 10;
    this.positionY = canvasHeight - this.height - 10;
  }

  draw() {
    // Draw the mini-map
    c.fillStyle = "rgba(255, 255, 255, 0.7)";
    c.fillRect(this.positionX, this.positionY, this.width, this.height);

    // Draw the scaled-down background on the mini-map
    c.drawImage(
      map.image,
      0,
      0,
      map.width,
      map.height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );

    // Draw the player on the mini-map
    const miniMapPlayerX = this.positionX + player.x * this.scale;

    const miniMapPlayerY = this.positionY + player.y * this.scale;

    c.fillStyle = "red";

    c.beginPath();
    c.arc(
      miniMapPlayerX,
      miniMapPlayerY,
      player.radius * 0.5,
      0,
      Math.PI * 2,
      false
    );
    c.fill();
  }
}

export default MiniMap;
