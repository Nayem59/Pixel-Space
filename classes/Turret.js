import { c } from "../utils/canvas.js";
import { turret, turretReady } from "../utils/assets.js";

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
    if (turretReady) {
      c.drawImage(turret, this.x - 32, this.y - 30);
    }
    c.restore();
  }
}

export default Turret;
