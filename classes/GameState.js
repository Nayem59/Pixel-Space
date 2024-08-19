class GameState {
  constructor() {
    this.playerHealth = 5;
    this.score = 0;
  }

  takeDamage(damage) {
    this.playerHealth -= damage;

    if (this.playerHealth < 0) {
      this.playerHealth = 0;
    }
  }
}

export default GameState;
