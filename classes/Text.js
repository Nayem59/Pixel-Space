import { c } from "../utils/canvas.js";

class Text {
  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.alpha = 1;
    this.random = Math.random() < 0.5 ? -0.5 : 0.5;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.font = "24px pixel";
    c.fillStyle = "red";
    c.fillText(this.text, this.x, this.y);
    c.restore();
  }

  update(delta) {
    this.draw();
    this.y -= 2 * delta;
    this.x += this.random * delta;
    this.alpha -= 0.02 * delta;
  }
}

export default Text;
