import { coinEl, endScore, gemEl, scoreEl } from "../main.js";

class GameState {
  constructor() {
    this.playerHealth = 5;
    this.score = 0;
    this.coins = 0;
    this.gems = 0;
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

  updateState() {
    scoreEl.innerHTML = this.score;
    endScore.innerHTML = this.score;
    coinEl.innerHTML = this.coins;
    gemEl.innerHTML = this.gems;
  }
}

export default GameState;
