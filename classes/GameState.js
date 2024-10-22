import { coinEl, gemEl, player, scoreEl } from "../main.js";
import Vector2 from "./Vector2.js";

class GameState {
  constructor() {
    this.playerHealth = 5;
    this.maxHealth = 5;
    this.playerLocation = new Vector2();
    this.timePlayed = 0;
    this.enemiesKilled = 0;
    this.bossesKilled = 0;
    this.damageDealt = 0;
    this.accuracy = 0;
    this.criticalHits = 0;
    this.healthLost = 0;
    this.goldEarned = 0;
    this.gemsCollected = 0;
    this.potionUsed = 0;
    this.missilesLaunched = 0;
    this.boostUsed = 0;
    this.shieldActivated = 0;
    this.cloakingUsed = 0;
    this.laserDuration = 0;
    this.upgradesUnlocked = 0;
    this.score = 0;
    this.coins = 0;
    this.gems = 100;
    this.kCoins = false;
    this.mCoins = false;
    this.kGems = false;
    this.mGems = false;
    this.isPaused = false;
    this.openStation = false;
    this.lastMarkedEnemy = null;
  }

  saveGameStateToLS() {
    this.playerLocation.x = player.x;
    this.playerLocation.y = player.y;

    const gameStateObj = {
      playerHealth: this.playerHealth,
      maxHealth: this.maxHealth,
      playerLocation: this.playerLocation,
      timePlayed: this.timePlayed,
      enemiesKilled: this.enemiesKilled,
      bossesKilled: this.bossesKilled,
      damageDealt: this.damageDealt,
      accuracy: this.accuracy,
      criticalHits: this.criticalHits,
      healthLost: this.healthLost,
      goldEarned: this.goldEarned,
      gemsCollected: this.gemsCollected,
      potionUsed: this.potionUsed,
      missilesLaunched: this.missilesLaunched,
      boostUsed: this.boostUsed,
      shieldActivated: this.shieldActivated,
      cloakingUsed: this.cloakingUsed,
      laserDuration: this.laserDuration,
      upgradesUnlocked: this.upgradesUnlocked,
      score: this.score,
      coins: this.coins,
      gems: this.gems,
      kCoins: this.kCoins,
      mCoins: this.mCoins,
      kGems: this.kGems,
      mGems: this.mGems,
    };
    localStorage.setItem("gameState", JSON.stringify(gameStateObj));
  }

  setStateFromLS(state) {
    this.playerHealth = state.playerHealth;
    this.maxHealth = state.maxHealth;
    player.x = state.playerLocation.x;
    player.y = state.playerLocation.y;
    this.timePlayed = state.timePlayed;
    this.enemiesKilled = state.enemiesKilled;
    this.bossesKilled = state.bossesKilled;
    this.damageDealt = state.damageDealt;
    this.accuracy = state.accuracy;
    this.criticalHits = state.criticalHits;
    this.healthLost = state.healthLost;
    this.goldEarned = state.goldEarned;
    this.gemsCollected = state.gemsCollected;
    this.potionUsed = state.potionUsed;
    this.missilesLaunched = state.missilesLaunched;
    this.boostUsed = state.boostUsed;
    this.shieldActivated = state.shieldActivated;
    this.cloakingUsed = state.cloakingUsed;
    this.laserDuration = state.laserDuration;
    this.upgradesUnlocked = state.upgradesUnlocked;
    this.score = state.score;
    this.coins = state.coins;
    this.gems = state.gems;
    this.kCoins = state.kCoins;
    this.mCoins = state.mCoins;
    this.kGems = state.kGems;
    this.mGems = state.mGems;
  }

  takeDamage(damage) {
    this.playerHealth -= damage;

    if (this.playerHealth < 0) {
      this.playerHealth = 0;
    }
  }

  addCoin() {
    this.coins++;
    if (this.coins > 999) {
      this.kCoins = true;
    }
    if (this.coins > 999999) {
      this.mCoins = true;
    }
  }
  addGem() {
    this.gems++;
    if (this.gems > 999) {
      this.kGems = true;
    }
    if (this.gems > 999999) {
      this.mGems = true;
    }
  }

  showCoins() {
    if (this.kCoins && this.mCoins) {
      return (this.coins / 1000000).toFixed(1) + "M";
    } else if (this.kCoins) {
      return (this.coins / 1000).toFixed(1) + "K";
    } else {
      return this.coins;
    }
  }

  showGems() {
    if (this.kGems && this.mGems) {
      return (this.gems / 1000000).toFixed(1) + "M";
    } else if (this.kGems) {
      return (this.gems / 1000).toFixed(1) + "K";
    } else {
      return this.gems;
    }
  }

  updateState() {
    scoreEl.innerHTML = this.score;
    // endScore.innerHTML = this.score;
    coinEl.innerHTML = this.showCoins();
    gemEl.innerHTML = this.showGems();
  }
}

export default GameState;
