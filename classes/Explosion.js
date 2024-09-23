import { c } from "../utils/canvas.js";
import Vector2 from "./Vector2.js";

class Explosion {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.alpha = 1;
    this.damageMultiplier = 2;
    this.velocity = new Vector2(0, 0);
    this.mass = 50;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "red";
    c.fill();
    c.restore();
  }

  update(delta) {
    this.draw();
    this.alpha -= 0.01 * delta;
  }
}

export default Explosion;
