import { canvasMidX, canvasMidY } from "../main.js";
import { c } from "../utils/canvas.js";
import Sprite from "../utils/sprite.js";
import Vector2 from "./Vector2.js";

class StationUI extends Sprite {
  constructor(spriteConfig) {
    super(spriteConfig);
    this.position = new Vector2(
      canvasMidX - this.frameSize.x / 2,
      canvasMidY - this.frameSize.y / 2
    );
    this.xButton = {
      x: canvasMidX + this.frameSize.x / 2 - 80,
      y: canvasMidY - this.frameSize.y / 2 - 2,
      width: 60,
      height: 60,
    };
  }

  draw() {
    // c.fillStyle = "red"; // Red button for close
    // c.fillRect(
    //   this.xButton.x,
    //   this.xButton.y,
    //   this.xButton.width,
    //   this.xButton.height
    // );
    super.drawImage(c, this.position.x, this.position.y);
  }
}

export default StationUI;
