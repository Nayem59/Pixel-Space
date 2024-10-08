import { c } from "../utils/canvas.js";

class Laser {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.active = false;
  }

  draw() {
    c.save();
    c.beginPath();
    c.moveTo(this.x1, this.y1);
    c.lineTo(this.x2, this.y2);
    c.lineWidth = 5;
    c.lineCap = "round";
    c.strokeStyle = "white";
    c.shadowColor = "red";
    c.shadowBlur = 10;
    c.stroke();
    c.restore();
  }
}

export default Laser;
