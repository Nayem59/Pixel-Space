import { c } from "../utils/canvas.js";
import { friction } from "../main.js";

// Create Particle Class
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  // create a custom draw method that initiates a circul and fills it
  draw() {
    // store the current drawing context state
    c.save();
    // setting global Alpha
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    // restoring the previously saved context state
    c.restore();
  }

  // update the coordinates to create the animation effect
  update(delta) {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x * delta;
    this.y = this.y + this.velocity.y * delta;
    // make alpha reduce on every frame update
    this.alpha -= 0.01;
  }
}

export default Particle;
