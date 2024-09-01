import { camera } from "../main.js";
import { c } from "../utils/canvas.js";
import Sprite from "../utils/sprite.js";

class Collectable extends Sprite {
  constructor(x, y, radius, type, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.type = type;
    this.margin = 40;
    this.frameDuration = (1 / 10) * 100;
  }

  draw() {
    if (this.insideCameraView()) {
      //   c.beginPath();
      //   c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      //   c.fillStyle = "red";
      //   c.fill();
      if (this.type === "gem") {
        c.shadowColor = "#7DF9FF";
        c.shadowBlur = 10;
      }
      super.drawImage(c, this.x - 8, this.y - 8);
    }
  }

  insideCameraView() {
    if (
      // adding a bit of margin so collectable doesnt get cut off on the edges
      this.x > camera.x - this.margin &&
      this.x < camera.x + camera.width + this.margin &&
      this.y > camera.y - this.margin &&
      this.y < camera.y + camera.height + this.margin
    ) {
      return true;
    }
    return false;
  }

  update(delta) {
    this.animate(delta);
    this.draw();
  }
}

export default Collectable;
