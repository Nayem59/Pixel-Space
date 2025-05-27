import { sounds } from "../utils/sounds.js";

class MenuState {
  constructor() {
    this.menuOpen = false;
    this.lastFrame = 0;
    this.volume = 10;
  }

  increaseVolume() {
    this.volume++;
    if (this.volume > 10) {
      this.volume = 10;
    }
    sounds.setDefaultVolume(this.volume / 10);
  }

  decreaseVolume() {
    this.volume--;
    if (this.volume < 0) {
      this.volume = 0;
    }
    sounds.setDefaultVolume(this.volume / 10);
  }
}

export default MenuState;
