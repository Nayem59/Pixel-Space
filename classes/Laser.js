import { c } from "../utils/canvas.js";

class Laser {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.active = false;
    this.laserMax = 2000;
    this.currentLaser = 0;
    this.overCharged = false;
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

  update(delta) {
    if (this.currentLaser === 0) {
      this.overCharged = false;
    }

    if (this.active && !this.overCharged) {
      this.currentLaser += 10 * delta;
      if (this.currentLaser >= this.laserMax) {
        this.active = false;
        this.overCharged = true;
      }
    } else {
      this.currentLaser =
        this.currentLaser < 0 ? 0 : this.currentLaser - 10 * delta;
    }
  }
}

export default Laser;
