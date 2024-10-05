import { camera, player, storeState } from "../main.js";
import { c } from "../utils/canvas.js";
import Sprite from "./Sprite.js";

class SkillUI extends Sprite {
  constructor(x, y, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.boostCooldownProgress = 0;
    this.boostRemainingTime = 0;
    this.totalBoostCooldown = 1000 + 300;
  }

  startBoostCooldown() {
    this.boostRemainingTime = this.totalBoostCooldown;
  }

  draw() {
    c.save();
    if (
      player.x - camera.x > this.x &&
      player.y - camera.y > this.y &&
      player.x - camera.x < this.x + this.frameSize.x
    ) {
      c.globalAlpha = 0.5;
    }
    super.drawImage(c, this.x, this.y);

    c.font = "15px pixel";
    c.fillStyle = "white";
    c.fillText(storeState.potionCount, this.x + 80, this.y + 85);
    c.fillText(storeState.boostCount, this.x + 176, this.y + 85);
    c.fillText(storeState.missileCount, this.x + 272, this.y + 85);

    if (this.boostCooldownProgress > 0) {
      c.save();
      c.globalAlpha = 0.8;
      c.fillStyle = "black";
      c.beginPath();
      const startAngle = -Math.PI / 2;
      const endAngle = -Math.PI / 2 + this.boostCooldownProgress * Math.PI * 2;

      c.arc(this.x + 152, this.y + 40, 25, startAngle, endAngle, false);
      c.lineTo(this.x + 152, this.y + 40);
      c.fill();
      c.restore();
    }

    c.restore();
  }

  update(delta) {
    if (this.boostRemainingTime > 0) {
      this.boostRemainingTime -= 10 * delta;
      this.boostCooldownProgress =
        this.boostRemainingTime / this.totalBoostCooldown;
    } else {
      this.boostRemainingTime = 0;
      this.boostCooldownProgress = 0;
    }
    this.draw();
  }
}
export default SkillUI;
