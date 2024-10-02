import { gameState, player } from "../main.js";

class StoreState {
  constructor() {
    this.healthUpgradePoint = 0;
    this.damageUpgradePoint = 0;
    this.speedUpgradePoint = 0;
    this.healthUpgradeCost = 200;
    this.damageUpgradeCost = 200;
    this.speedUpgradeCost = 200;
    this.hasContinuousLaser = true;
    this.hasTwinTurret = true;
    this.missileCount = 10;
    this.boostCount = 10;
  }

  increaseHealth() {
    if (
      this.healthUpgradePoint < 10 &&
      this.damageUpgradeCost <= gameState.coins
    ) {
      gameState.coins -= this.healthUpgradeCost;
      gameState.playerHealth++;
      gameState.updateState();
      this.healthUpgradePoint++;
      this.healthUpgradeCost += 200;
      return true;
    } else {
      return false;
    }
  }
  increaseDamage() {
    if (
      this.damageUpgradePoint < 10 &&
      this.damageUpgradeCost <= gameState.coins
    ) {
      gameState.coins -= this.damageUpgradeCost;
      player.damage++;
      gameState.updateState();
      this.damageUpgradePoint++;
      this.damageUpgradeCost += 200;
      return true;
    } else {
      return false;
    }
  }
  increaseSpeed() {
    if (
      this.speedUpgradePoint < 10 &&
      this.damageUpgradeCost <= gameState.coins
    ) {
      gameState.coins -= this.speedUpgradeCost;
      player.maxVelocity += 0.3;
      gameState.updateState();
      this.speedUpgradePoint++;
      this.speedUpgradeCost += 200;
      return true;
    } else {
      return false;
    }
  }
  upgradeToAutoTurret() {
    this.hasContinuousLaser = true;
  }
  upgradeToTwinTurret() {
    this.hasTwinTurret = true;
  }
  buyMissiles(amount) {
    this.missileCount += amount;
  }
  buyBoost(amount) {
    this.boostCount += amount;
  }
}

export default StoreState;
