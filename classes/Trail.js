import { camera } from "../main.js";
import { c } from "../utils/canvas.js";

// Create Trail Class
class Trail {
  constructor(x, y, color, degree) {
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.color = color;
    this.alpha = 1;
    this.degree = degree;
  }

  // create a custom draw method that initiates a circul and fills it
  draw() {
    // store the current drawing context state
    c.save();
    // setting global Alpha
    c.globalAlpha = this.alpha;
    c.translate(this.x - camera.x, this.y - camera.y);
    c.rotate((this.degree * Math.PI) / 180);
    c.translate(-(this.x - camera.x), -(this.y - camera.y));

    c.strokeStyle = "red";
    c.fillStyle = this.color;
    c.shadowColor = "red";
    c.shadowBlur = 5;

    c.beginPath();
    c.arc(
      this.x - camera.x - 8,
      this.y - camera.y + 14,
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
      this.y - camera.y + 14,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    c.stroke();
    c.fill();

    // restoring the previously saved context state
    c.restore();
  }

  // update the coordinates to create the animation effect
  update() {
    this.draw();
    // make alpha reduce on every frame update
    this.alpha -= 0.05;
    this.radius -= 0.1;
  }
}

export default Trail;
