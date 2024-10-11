import { cM, menuCanvas } from "../utils/canvas.js";
import Sprite from "./Sprite.js";

class MenuUI extends Sprite {
  constructor(spriteConfig) {
    super(spriteConfig);
    this.newGameButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 35,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 157,
      width: 330,
      height: 60,
    };
    this.resumeButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 35,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 91,
      width: 330,
      height: 60,
    };
    this.saveGameButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 35,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 25,
      width: 330,
      height: 60,
    };
    this.resumeGameButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 35,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 157,
      width: 330,
      height: 60,
    };
  }

  draw() {
    super.drawImage(cM, this.position.x, this.position.y);
    // cM.fillStyle = "red";
    // cM.fillRect(
    //   this.resumeGameButton.x,
    //   this.resumeGameButton.y,
    //   this.resumeGameButton.width,
    //   this.resumeGameButton.height
    // );
  }
}

export default MenuUI;
