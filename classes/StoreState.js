import { gameState, player, stationUI } from "../main.js";

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

  saveStoreStateToLS() {
    const storeStateObj = {
      healthUpgradePoint: this.healthUpgradePoint,
      damageUpgradePoint: this.damageUpgradePoint,
      speedUpgradePoint: this.speedUpgradePoint,
      healthUpgradeCost: this.healthUpgradeCost,
      damageUpgradeCost: this.damageUpgradeCost,
      speedUpgradeCost: this.speedUpgradeCost,
      hasContinuousFire: this.hasContinuousFire,
      hasTwinTurret: this.hasTwinTurret,
      hasLaser: this.hasLaser,
      missileCount: this.missileCount,
      boostCount: this.boostCount,
      potionCount: this.potionCount,
      shieldCount: this.shieldCount,
      cloakCount: this.cloakCount,
    };
    localStorage.setItem("storeState", JSON.stringify(storeStateObj));
  }

  setStateFromLS(state) {
    this.healthUpgradePoint = state.healthUpgradePoint;
    stationUI.healthUpgrade.frame = state.healthUpgradePoint;
    this.damageUpgradePoint = state.damageUpgradePoint;
    stationUI.damageUpgrade.frame = state.damageUpgradePoint;
    this.speedUpgradePoint = state.speedUpgradePoint;
    stationUI.speedUpgrade.frame = state.speedUpgradePoint;
    this.healthUpgradeCost = state.healthUpgradeCost;
    this.damageUpgradeCost = state.damageUpgradeCost;
    this.speedUpgradeCost = state.speedUpgradeCost;
    this.hasContinuousFire = state.hasContinuousFire;
    this.hasTwinTurret = state.hasTwinTurret;
    this.hasLaser = state.hasLaser;
    this.missileCount = state.missileCount;
    this.boostCount = state.boostCount;
    this.potionCount = state.potionCount;
    this.shieldCount = state.shieldCount;
    this.cloakCount = state.cloakCount;
  }

  increaseHealth() {
    if (
      this.healthUpgradePoint < 10 &&
      this.healthUpgradeCost <= gameState.coins
    ) {
      gameState.coins -= this.healthUpgradeCost;
      gameState.playerHealth++;
      gameState.maxHealth++;
      gameState.upgradesUnlocked++;
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
      gameState.upgradesUnlocked++;
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
      gameState.upgradesUnlocked++;
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
        gameState.upgradesUnlocked++;
      }
    }
  }
  upgradeToTwinTurret() {
    if (!this.hasTwinTurret && this.hasContinuousFire) {
      if (this.twinTurretCost <= gameState.gems) {
        gameState.gems -= this.twinTurretCost;
        this.hasTwinTurret = true;
        gameState.upgradesUnlocked++;
      }
    }
  }
  upgradeToLaserGun() {
    if (!this.hasLaser && this.hasTwinTurret) {
      if (this.laserGunCost <= gameState.gems) {
        gameState.gems -= this.laserGunCost;
        this.hasLaser = true;
        gameState.upgradesUnlocked++;
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
      gameState.updateState();
    }
  }
  buyGems() {
    if (100 <= gameState.coins) {
      gameState.coins -= 100;
      gameState.gems++;
      gameState.updateState();
    }
  }
}

export default StoreState;
