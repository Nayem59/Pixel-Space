import { gameState } from "../main.js";
import { c } from "../utils/canvas.js";
import { sounds } from "../utils/sounds.js";

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

  charge(delta) {
    if (this.active && !this.overCharged) {
      sounds.loopSound("laser2");
      this.currentLaser += 10 * delta;
      gameState.laserDuration += delta / 100;
      if (this.currentLaser >= this.laserMax) {
        this.active = false;
        this.overCharged = true;
      }
    }
  }

  update(delta) {
    if (!this.active || this.overCharged) {
      sounds.stopSound("laser2");
      this.currentLaser =
        this.currentLaser < 0 ? 0 : this.currentLaser - 10 * delta;
    }

    if (this.currentLaser === 0) {
      this.overCharged = false;
    }
  }
}

export default Laser;
