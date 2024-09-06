import { camera, player } from "../main.js";
import { c } from "../utils/canvas.js";
import Sprite from "../utils/sprite.js";

class SpaceStation extends Sprite {
  constructor(radius, spriteConfig) {
    super(spriteConfig);
    this.radius = radius;
    this.margin = 40;
  }

  draw() {
    if (this.insideCameraView()) {
      c.beginPath();
      c.arc(
        this.position.x,
        this.position.y,
        this.radius,
        0,
        Math.PI * 2,
        false
      );
      c.fillStyle = "red";
      c.fill();
      c.save();
      if (this.playerDetection()) {
        c.shadowColor = "white";
        c.shadowBlur = 10;
      }
      super.drawImage(c, this.position.x - 260, this.position.y - 245);
      c.restore();
    }
  }

  playerDetection() {
    const distPlStation = Math.hypot(
      player.x - this.position.x,
      player.y - this.position.y
    );
    const playerDetected = distPlStation < this.radius;
    return playerDetected;
  }

  mouseDetection(e) {
    const distMouseStation = Math.hypot(
      e.clientX + camera.x - this.position.x,
      e.clientY + camera.y - this.position.y
    );
    const mouseDetected = distMouseStation < this.radius;
    return mouseDetected;
  }

  insideCameraView() {
    if (
      // adding a bit of margin so collectable doesnt get cut off on the edges
      this.position.x > camera.x - this.margin &&
      this.position.x < camera.x + camera.width + this.margin &&
      this.position.y > camera.y - this.margin &&
      this.position.y < camera.y + camera.height + this.margin
    ) {
      return true;
    }
    return false;
  }
}

export default SpaceStation;
