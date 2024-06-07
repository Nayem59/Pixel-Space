import { c } from "../utils/canvas.js";
import { assets } from "../utils/assets.js";

class Turret {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  draw() {
    c.save();
    c.translate(this.x, this.y);
    // 1.5708 rad is 90deg adding to offset
    c.rotate(this.angle + 1.5708);
    c.translate(-this.x, -this.y);
    if (assets.images.turret.isLoaded) {
      c.drawImage(assets.images.turret.image, this.x - 32, this.y - 40);
    }
    c.restore();
  }
}

export default Turret;
