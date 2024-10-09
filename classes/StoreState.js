import { gameState, player } from "../main.js";

class StoreState {
  constructor() {
    this.healthUpgradePoint = 0;
    this.damageUpgradePoint = 0;
    this.speedUpgradePoint = 0;
    this.healthUpgradeCost = 200;
    this.damageUpgradeCost = 200;
    this.speedUpgradeCost = 200;
    this.hasContinuousFire = false;
    this.hasTwinTurret = false;
    this.hasLaser = false;
    this.missileCount = 99;
    this.boostCount = 99;
    this.potionCount = 99;
    this.shieldCount = 99;
    this.cloakCount = 99;
    this.potionCost = 30;
    this.missleCost = 50;
    this.boostCost = 10;
    this.shieldCost = 50;
    this.cloakCost = 70;
    this.autoTurretCost = 5;
    this.twinTurretCost = 10;
    this.laserGunCost = 15;
  }

  increaseHealth() {
    if (
      this.healthUpgradePoint < 10 &&
      this.healthUpgradeCost <= gameState.coins
    ) {
      gameState.coins -= this.healthUpgradeCost;
      gameState.playerHealth++;
      gameState.maxHealth++;
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
      this.speedUpgradeCost <= gameState.coins
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
    if (!this.hasContinuousFire) {
      if (this.autoTurretCost <= gameState.gems) {
        gameState.gems -= this.autoTurretCost;
        this.hasContinuousFire = true;
      }
    }
  }
  upgradeToTwinTurret() {
    if (!this.hasTwinTurret && this.hasContinuousFire) {
      if (this.twinTurretCost <= gameState.gems) {
        gameState.gems -= this.twinTurretCost;
        this.hasTwinTurret = true;
      }
    }
  }
  upgradeToLaserGun() {
    if (!this.hasLaser && this.hasTwinTurret) {
      if (this.laserGunCost <= gameState.gems) {
        gameState.gems -= this.laserGunCost;
        this.hasLaser = true;
      }
    }
  }
  buyMissiles(amount) {
    if (this.missleCost <= gameState.coins) {
      const total = this.missileCount + amount;
      if (total > 99) {
        console.log(
          "You can't buy this ammount as you only have an inventory space of 99!"
        );
      } else {
        gameState.coins -= this.missleCost;
        this.missileCount = total;
      }
    }
  }
  buyBoost(amount) {
    if (this.boostCost <= gameState.coins) {
      const total = this.boostCount + amount;
      if (total > 99) {
        console.log(
          "You can't buy this ammount as you only have an inventory space of 99!"
        );
      } else {
        gameState.coins -= this.boostCost;
        this.boostCount = total;
      }
    }
  }
  buyPotions(amount) {
    if (this.potionCost <= gameState.coins) {
      const total = this.potionCount + amount;
      if (total > 99) {
        console.log(
          "You can't buy this ammount as you only have an inventory space of 99!"
        );
      } else {
        gameState.coins -= this.potionCost;
        this.potionCount = total;
      }
    }
  }
  buyShields(amount) {
    if (this.shieldCost <= gameState.coins) {
      const total = this.shieldCount + amount;
      if (total > 99) {
        console.log(
          "You can't buy this ammount as you only have an inventory space of 99!"
        );
      } else {
        gameState.coins -= this.shieldCost;
        this.shieldCount = total;
      }
    }
  }
  buyCloak(amount) {
    if (this.cloakCost <= gameState.coins) {
      const total = this.cloakCount + amount;
      if (total > 99) {
        console.log(
          "You can't buy this ammount as you only have an inventory space of 99!"
        );
      } else {
        gameState.coins -= this.cloakCost;
        this.cloakCount = total;
      }
    }
  }
  buyCoins() {
    if (1 <= gameState.gems) {
      gameState.gems--;
      gameState.coins += 90;
    }
  }
  buyGems() {
    if (100 <= gameState.coins) {
      gameState.coins -= 100;
      gameState.gems++;
    }
  }
}

export default StoreState;
