import { camera, lasers, player, storeState } from "../main.js";
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

    this.shieldCooldownProgress = 0;
    this.shieldRemainingTime = 0;
    this.totalShieldCooldown = 10000 + 5000;

    this.cloakOnCooldown = false;
    this.cloakDuration = 60000;
    this.cloakCooldownTime = 20000;
    this.cloakCooldownProgress = 0;
    this.cloakRemainingTime = 0;
    this.totalCloakCooldown = this.cloakDuration + this.cloakCooldownTime;
  }

  startBoostCooldown() {
    this.boostRemainingTime = this.totalBoostCooldown;
  }

  startShieldCooldown() {
    this.shieldRemainingTime = this.totalShieldCooldown;
  }

  startCloakCooldown() {
    this.cloakRemainingTime = this.totalCloakCooldown;
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
    c.fillText(storeState.potionCount, this.x + 82, this.y + 85);
    c.fillText(storeState.boostCount, this.x + 178, this.y + 85);
    c.fillText(storeState.missileCount, this.x + 274, this.y + 85);
    c.fillText(storeState.shieldCount, this.x + 370, this.y + 85);
    c.fillText(storeState.cloakCount, this.x + 466, this.y + 85);

    if (this.boostCooldownProgress > 0) {
      c.save();
      c.globalAlpha = 0.8;
      c.fillStyle = "black";
      c.beginPath();
      const startAngle = -Math.PI / 2;
      const endAngle = -Math.PI / 2 + this.boostCooldownProgress * Math.PI * 2;

      c.arc(this.x + 154, this.y + 39, 25, startAngle, endAngle, false);
      c.lineTo(this.x + 154, this.y + 39);
      c.fill();
      c.restore();
    }
    if (this.shieldCooldownProgress > 0) {
      c.save();
      c.globalAlpha = 0.8;
      c.fillStyle = "black";
      c.beginPath();
      const startAngle = -Math.PI / 2;
      const endAngle = -Math.PI / 2 + this.shieldCooldownProgress * Math.PI * 2;

      c.arc(this.x + 346, this.y + 39, 27, startAngle, endAngle, false);
      c.lineTo(this.x + 346, this.y + 39);
      c.fill();
      c.restore();
    }

    if (this.cloakCooldownProgress > 0) {
      c.save();
      c.globalAlpha = 0.8;
      c.fillStyle = "black";
      c.beginPath();
      const startAngle = -Math.PI / 2;
      const endAngle = -Math.PI / 2 + this.cloakCooldownProgress * Math.PI * 2;

      c.arc(this.x + 442, this.y + 39, 27, startAngle, endAngle, false);
      c.lineTo(this.x + 442, this.y + 39);
      c.fill();
      c.restore();
    }

    if (storeState.hasLaser) {
      const laserPercentage = lasers[0].currentLaser / lasers[0].laserMax;
      c.save();
      c.strokeStyle = "#7DF9FF";
      c.beginPath();
      c.roundRect(this.x - 10, this.y + 5, 10, this.frameSize.y - 10, 5);
      c.stroke();
      c.beginPath();
      c.roundRect(
        this.x - 8,
        this.y + this.frameSize.y - 7,
        6,
        (this.frameSize.y - 14) * -1 * laserPercentage,
        5
      );
      c.fillStyle = "red";
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

    if (this.shieldRemainingTime > 0) {
      this.shieldRemainingTime -= 10 * delta;
      this.shieldCooldownProgress =
        this.shieldRemainingTime / this.totalShieldCooldown;
    } else {
      this.shieldRemainingTime = 0;
      this.shieldCooldownProgress = 0;
    }

    if (this.cloakRemainingTime > 0) {
      this.cloakRemainingTime -= 10 * delta;
      this.cloakCooldownProgress =
        this.cloakRemainingTime / this.totalCloakCooldown;
      if (
        this.cloakRemainingTime <
        this.totalCloakCooldown - this.cloakDuration
      ) {
        player.cloakActive = false;
        this.cloakOnCooldown = true;
      }
    } else {
      this.cloakRemainingTime = 0;
      this.cloakCooldownProgress = 0;
      this.cloakOnCooldown = false;
    }
    this.draw();
  }
}
export default SkillUI;
