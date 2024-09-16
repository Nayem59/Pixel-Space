import { c } from "../utils/canvas.js";

class EnemyHealthBar {
  constructor(x, y, hp, maxHp) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 5;
    this.hp = hp;
    this.maxHp = maxHp;
  }

  draw() {
    const healthPercentage = this.hp / this.maxHp;
    const currentWidth = this.width * healthPercentage;

    c.save();
    c.strokeStyle = "#7DF9FF";
    c.beginPath();
    c.roundRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2, 3);
    c.stroke();
    c.beginPath();
    c.roundRect(this.x, this.y, currentWidth, this.height, 3);
    if (this.hp < this.maxHp * 0.25) {
      c.fillStyle = "red";
    } else if (this.hp < this.maxHp * 0.51) {
      c.fillStyle = "orange";
    } else {
      c.fillStyle = "green";
    }
    c.fill();
    c.restore();
  }

  update(hp) {
    this.hp = hp;
    this.draw();
  }
}

export default EnemyHealthBar;
