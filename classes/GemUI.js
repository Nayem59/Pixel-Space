import { c } from "../utils/canvas.js";
import Sprite from "./Sprite.js";

class GemUI extends Sprite {
  constructor(x, y, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
  }
  draw() {
    super.drawImage(c, this.x, this.y);
  }
}
export default GemUI;
