import { camera } from "../main.js";
import { c } from "../utils/canvas.js";

class Trail {
  constructor(x, y, color, outerColor, degree) {
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.color = color;
    this.outerColor = outerColor;
    this.alpha = 1;
    this.degree = degree;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.translate(this.x - camera.x, this.y - camera.y);
    c.rotate((this.degree * Math.PI) / 180);
    c.translate(-(this.x - camera.x), -(this.y - camera.y));

    c.strokeStyle = this.outerColor;
    c.fillStyle = this.color;
    c.shadowColor = this.outerColor;
    c.shadowBlur = 5;

    c.beginPath();
    c.arc(
      this.x - camera.x - 8,
      this.y - camera.y + 24,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    c.stroke();
    c.fill();

    c.beginPath();
    c.arc(
      this.x - camera.x + 8,
      this.y - camera.y + 24,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    c.stroke();
    c.fill();

    c.restore();
  }

  update(delta) {
    this.draw();
    this.alpha -= 0.05 * delta;
    this.radius -= 0.1 * delta;
  }
}

export default Trail;
