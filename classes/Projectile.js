import { c } from "../utils/canvas.js";

// Create Projectile Class
class Projectile {
  constructor(x, y, radius, color, velocity, angle) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.angle = angle;
  }

  // create a custom draw method that initiates a circul and fills it
  draw() {
    // c.beginPath();
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = this.color;
    // c.fill();

    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.translate(-this.x, -this.y);

    c.beginPath();
    // - 2.5 to center projectile to cursor
    c.rect(this.x, this.y - 2.5, 15, 5);
    c.fillStyle = this.color;
    c.fill();

    c.restore();
  }

  // update the coordinates to create the animation effect
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

export default Projectile;
