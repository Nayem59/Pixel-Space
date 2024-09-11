import { c } from "../utils/canvas.js";
import { assets } from "../utils/assets.js";
import Sprite from "./Sprite.js";
import { camera } from "../main.js";

class Turret extends Sprite {
  constructor(x, y, angle, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.frameDuration = (1 / 30) * 100;
  }

  draw() {
    c.save();
    c.translate(this.x - camera.x, this.y - camera.y);
    // 1.5708 rad is 90deg adding to offset
    c.rotate(this.angle + 1.5708);
    c.translate(-(this.x - camera.x), -(this.y - camera.y));
    if (assets.images.turret.isLoaded) {
      c.shadowColor =
        this.frame === 0 ? "#7DF9FF" : `hsl(${this.frame * 20},100%,50%)`;
      c.shadowBlur = this.frame === 0 ? 8 : this.frame - 1;
      super.drawImage(c, this.x - camera.x - 32, this.y - camera.y - 47);
    }
    c.restore();
  }

  startAnimation() {
    this.isAnimating = true;
    this.frame = 0;
  }
}

export default Turret;
