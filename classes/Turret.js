import { c } from "../utils/canvas.js";
import { assets } from "../utils/assets.js";
import Sprite from "../utils/sprite.js";

class Turret extends Sprite {
  constructor(x, y, angle, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.isAnimating = false;
    this.animationFrameCount = 0;
    this.maxAnimationFrames = this.frameMap.size;
  }

  draw() {
    c.save();
    c.translate(this.x, this.y);
    // 1.5708 rad is 90deg adding to offset
    c.rotate(this.angle + 1.5708);
    c.translate(-this.x, -this.y);
    if (assets.images.turret.isLoaded) {
      c.shadowColor =
        this.frame === 0 ? "#7DF9FF" : `hsl(${this.frame * 20},100%,50%)`;
      c.shadowBlur = this.frame === 0 ? 8 : this.frame - 1;
      super.drawImage(c, this.x - 32, this.y - 40);
    }
    c.restore();
  }

  startAnimation() {
    this.isAnimating = true;
    this.frame = 0;
    this.animationFrameCount = 0;
  }

  updateAnimation() {
    if (this.isAnimating) {
      this.animationFrameCount++;
      if (this.animationFrameCount % 2 === 0) {
        // this to limit and adjust animation speed
        this.frame++;
        if (this.frame >= this.maxAnimationFrames) {
          this.isAnimating = false;
          this.frame = 0;
        }
      }
    }
  }
}

export default Turret;
