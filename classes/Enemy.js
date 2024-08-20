import { assets } from "../utils/assets.js";
import { c } from "../utils/canvas.js";
import Sprite from "../utils/sprite.js";
import { camera, player } from "../main.js";

class Enemy extends Sprite {
  constructor(x, y, radius, color, velocity, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.detectionRadius = 300;
    this.active = false;
    this.hitDuration = 0;
    this.margin = 40;
    this.color = color;
    this.velocity = velocity;
    this.mass = 5;
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

  playerDetection() {
    const distPlEn = Math.hypot(player.x - this.x, player.y - this.y);
    return distPlEn < this.detectionRadius;
  }

  insideCameraView() {
    if (
      // adding a bit of margin so it doesnt get cut off on the edges
      this.x > camera.x - this.margin &&
      this.x < camera.x + camera.width + this.margin &&
      this.y > camera.y - this.margin &&
      this.y < camera.y + camera.height + this.margin
    ) {
      return true;
    }
    return false;
  }

  update(delta) {
    if (this.insideCameraView()) {
      this.draw();
      this.active = true;
    } else {
      this.active = false;
    }

    if (this.playerDetection() && this.hitDuration < 1) {
      const angle = Math.atan2(player.y - this.y, player.x - this.x);
      this.velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };
    } else {
      this.hitDuration--;
    }

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
