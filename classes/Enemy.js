import { assets } from "../utils/assets.js";
import { c } from "../utils/canvas.js";
import Sprite from "../utils/sprite.js";

// Create Enemy Class
class Enemy extends Sprite {
  constructor(x, y, radius, color, velocity, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  // create a custom draw method that initiates a circul and fills it
  draw() {
    // c.beginPath();
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = this.color;
    // c.fill();
    if (assets.images.purpleBlob.isLoaded) {
      super.drawImage(c, this.x - 32, this.y - 32);
    }
  }

  // update the coordinates to create the animation effect
  update(delta) {
    this.draw();
    this.x = this.x + this.velocity.x * delta;
    this.y = this.y + this.velocity.y * delta;
  }
}

export default Enemy;
