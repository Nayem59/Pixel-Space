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
    this.yesButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 102,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 291,
      width: 85,
      height: 59,
    };
    this.noButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 214,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 291,
      width: 85,
      height: 59,
    };
    this.statsControlsButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 35,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 223,
      width: 330,
      height: 60,
    };
    this.creditsButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 35,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 289,
      width: 330,
      height: 60,
    };
    this.supportMeButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 35,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 355,
      width: 330,
      height: 60,
    };
    this.webSiteButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 152,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 421,
      width: 67,
      height: 60,
    };
    this.linkedInButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 226,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 421,
      width: 55,
      height: 60,
    };
    this.gitHubButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 288,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 421,
      width: 59,
      height: 60,
    };
    this.backButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 30,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 18,
      width: 46,
      height: 37,
    };
  }

  draw() {
    super.drawImage(cM, this.position.x, this.position.y);
    // cM.fillStyle = "red";
    // cM.fillRect(
    //   this.backButton.x,
    //   this.backButton.y,
    //   this.backButton.width,
    //   this.backButton.height
    // );
  }
}

export default MenuUI;
