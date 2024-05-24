import { c } from "../utils/canvas.js";
import { assets } from "../utils/assets.js";

// Create main Player Class
class Player {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.speed = 0.2;
    this.maxVelocity = 3;
    this.rotation = 0;
    this.degree = 0;
  }

  // create a custom draw method that initiates a circul and fills it
  draw() {
    // for collision and debug purposes
    // c.beginPath();
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = this.color;
    // c.fill();

    // saving state of context and handle draw & rotation of image
    c.save();
    c.translate(this.x, this.y);
    c.rotate((this.degree * Math.PI) / 180);
    c.translate(-this.x, -this.y);
    if (assets.images.ship1.isLoaded) {
      c.drawImage(assets.images.ship1.image, this.x - 16, this.y - 17);
    }
    c.restore();
  }

  // update the coordinates to create the animation effect
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.degree += this.rotation;
  }
}

export default Player;
