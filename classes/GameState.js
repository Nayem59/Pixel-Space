import { coinEl, endScore, gemEl, scoreEl } from "../main.js";

class GameState {
  constructor() {
    this.playerHealth = 5;
    this.maxHealth = 5;
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
