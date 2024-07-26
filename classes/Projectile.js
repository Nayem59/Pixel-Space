import { c } from "../utils/canvas.js";

class Projectile {
  constructor(x, y, radius, color, velocity, angle) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.angle = angle;
  }

  draw() {
    // for collision and debug purposes
    // c.beginPath();
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = this.color;
    // c.fill();

    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.translate(-this.x, -this.y);

    c.strokeStyle = "red";
    c.shadowColor = "red";
    c.shadowBlur = 10;
    c.beginPath();
    // - 2.5 to center projectile to cursor
    c.roundRect(this.x, this.y - 2.5, 15, 5, 5);
    c.stroke();
    c.fillStyle = this.color;
    c.fill();

    c.restore();
  }

  update(delta) {
    this.draw();
    this.x = this.x + this.velocity.x * delta;
    this.y = this.y + this.velocity.y * delta;
  }
}

export default Projectile;
