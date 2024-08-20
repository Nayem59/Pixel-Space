import { assets } from "../utils/assets.js";
import { c } from "../utils/canvas.js";
import Sprite from "../utils/sprite.js";

class HealthBar extends Sprite {
  constructor(x, y, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.isAnimating = false;
    this.frameTimer = 0;
    this.frameDuration = (1 / 10) * 100;
    this.stepAnimationFrames = 3;
    this.maxAnimationFrames = this.frameMap.size;
  }

  draw() {
    if (assets.images.live.isLoaded) {
      super.drawImage(c, this.x, this.y);
    }
  }

  startAnimation() {
    this.isAnimating = true;
    // this.frame = 0;
  }

  update(delta) {
    this.draw();

    if (this.isAnimating) {
      this.frameTimer += delta;
      while (this.frameTimer >= this.frameDuration) {
        this.frameTimer -= this.frameDuration;
        this.frame++;
        if (this.frame >= this.maxAnimationFrames) {
          this.isAnimating = false;
          this.frame = 0;
        }

        if (this.frame >= this.stepAnimationFrames) {
          this.isAnimating = false;
          this.stepAnimationFrames += 3;
        }
      }
    }
  }
}

export default HealthBar;
