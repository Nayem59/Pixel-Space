import { assets } from "../utils/assets.js";
import { c } from "../utils/canvas.js";
import Sprite from "./Sprite.js";

class HealthBar extends Sprite {
  constructor(x, y, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.frameDuration = (1 / 10) * 100;
    this.maxAnimationFrames = 3;
    this.healthMap = {
      15: 0,
      14: 3,
      13: 4,
      12: 5,
      11: 6,
      10: 7,
      9: 8,
      8: 9,
      7: 10,
      6: 11,
      5: 12,
      4: 13,
      3: 14,
      2: 15,
      1: 16,
      0: 17,
    };
  }

  draw() {
    if (assets.images.live.isLoaded) {
      super.drawImage(c, this.x, this.y);
    }
  }

  startAnimation() {
    this.isAnimating = true;
    this.frame = 1;
  }

  update(delta) {
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
    this.draw();
  }
}

export default HealthBar;
