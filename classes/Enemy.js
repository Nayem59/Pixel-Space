import { c } from "../utils/canvas.js";

// Create Enemy Class
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  // create a custom draw method that initiates a circul and fills it
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  // update the coordinates to create the animation effect
  update(delta) {
    this.draw();
    this.x = this.x + this.velocity.x * delta;
    this.y = this.y + this.velocity.y * delta;
  }
}

export default Enemy;
