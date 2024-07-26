import { assets } from "../utils/assets.js";
import { c } from "../utils/canvas.js";
import Sprite from "../utils/sprite.js";

class Enemy extends Sprite {
  constructor(x, y, radius, color, velocity, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.isAnimating = false;
    this.frameTimer = 0;
    this.frameDuration = (1 / 10) * 100;
    this.maxAnimationFrames = this.frameMap.size;
  }

  draw() {
    if (assets.images.purpleBlob.isLoaded) {
      super.drawImage(c, this.x - 32, this.y - 32);
    }
  }

  startAnimation() {
    this.isAnimating = true;
    this.frame = 0;
  }

  update(delta) {
    this.draw();
    this.x = this.x + this.velocity.x * delta;
    this.y = this.y + this.velocity.y * delta;

    if (this.isAnimating) {
      this.frameTimer += delta;
      while (this.frameTimer >= this.frameDuration) {
        this.frameTimer -= this.frameDuration;
        this.frame++;
        if (this.frame >= this.maxAnimationFrames) {
          this.isAnimating = false;
          this.frame = 0;
        }
      }
    }
  }
}

export default Enemy;
