import { c } from "../utils/canvas.js";

class Text {
  constructor(x, y, text, doubleFont) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.alpha = 1;
    this.random = Math.random() < 0.5 ? -0.5 : 0.5;
    this.fontSize = 24;
    this.doubleFont = doubleFont;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.font = `${
      this.doubleFont ? "bold " + this.fontSize * 2 : this.fontSize
    }px pixel`;
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
