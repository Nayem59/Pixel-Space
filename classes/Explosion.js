import { c } from "../utils/canvas.js";
import Sprite from "./Sprite.js";
import Vector2 from "./Vector2.js";

class Explosion extends Sprite {
  constructor(x, y, radius, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.radius = radius;
    // this.alpha = 1;
    this.damageMultiplier = 2;
    this.velocity = new Vector2(0, 0);
    this.mass = 50;
    this.isAnimating = true;
    this.frameDuration = (1 / 15) * 100;
    this.destroy = false;
  }

  draw() {
    // c.save();
    // c.globalAlpha = this.alpha;
    // c.beginPath();
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = "red";
    // c.fill();
    // c.restore();
    super.drawImage(c, this.x - 48, this.y - 48);
  }

  update(delta) {
    this.draw();
    this.animate(
      delta,
      true,
      Math.random() < 0.5 ? "explosion1" : "explosion2"
    );
    // this.alpha -= 0.01 * delta;
  }
}

export default Explosion;
