import { camera } from "../main.js";
import { assets } from "../utils/assets.js";
import { c } from "../utils/canvas.js";
import Sprite from "../utils/sprite.js";
import Vector2 from "./Vector2.js";

class Collectable extends Sprite {
  constructor(x, y, radius, type, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.type = type;
    this.margin = 40;
    this.frameDuration = (1 / 10) * 100;
  }

  createCollectionEffect() {
    if (this.type === "coin") {
      const coinEffect = new Sprite({
        asset: assets.images.coinEffect,
        frameSize: new Vector2(16, 16),
        hFrames: 14,
        vFrames: 1,
        frame: 0,
        position: new Vector2(this.x, this.y),
      });
      coinEffect.frameDuration = (1 / 30) * 100;
      return coinEffect;
    }
    if (this.type === "gem") {
      const gemEffect = new Sprite({
        asset: assets.images.gemEffect,
        frameSize: new Vector2(16, 16),
        hFrames: 10,
        vFrames: 1,
        frame: 0,
        position: new Vector2(this.x, this.y),
      });
      gemEffect.frameDuration = (1 / 15) * 100;
      return gemEffect;
    }
  }

  draw() {
    if (this.insideCameraView()) {
      //   c.beginPath();
      //   c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      //   c.fillStyle = "red";
      //   c.fill();
      if (this.type === "gem") {
        c.shadowColor = "#7DF9FF";
        c.shadowBlur = 10;
      }
      super.drawImage(c, this.x - 8, this.y - 8);
    }
  }

  insideCameraView() {
    if (
      // adding a bit of margin so collectable doesnt get cut off on the edges
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
    this.animate(delta);
    this.draw();
  }
}

export default Collectable;
