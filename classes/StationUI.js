import { canvasMidX, canvasMidY } from "../main.js";
import { assets } from "../utils/assets.js";
import { c } from "../utils/canvas.js";
import Sprite from "../utils/sprite.js";
import Vector2 from "./Vector2.js";

class StationUI extends Sprite {
  constructor(spriteConfig) {
    super(spriteConfig);
    this.position = new Vector2(
      canvasMidX - this.frameSize.x / 2,
      canvasMidY - this.frameSize.y / 2
    );
    this.xButton = {
      x: canvasMidX + this.frameSize.x / 2 - 80,
      y: canvasMidY - this.frameSize.y / 2 - 2,
      width: 60,
      height: 60,
    };
    this.upgradeTab = {
      x: canvasMidX - 435,
      y: canvasMidY - this.frameSize.y / 2 + 5,
      width: 365,
      height: 65,
    };
    this.shopTab = {
      x: canvasMidX + this.frameSize.x / 2 - 480,
      y: canvasMidY - this.frameSize.y / 2 + 5,
      width: 365,
      height: 65,
    };
    this.currentTab = "upgrade";
    this.healthUpgrade = new Sprite({
      asset: assets.images.healthUpgrade,
      frameSize: new Vector2(900, 600),
      hFrames: 11,
      vFrames: 1,
      frame: 0,
    });
    this.damageUpgrade = new Sprite({
      asset: assets.images.damageUpgrade,
      frameSize: new Vector2(900, 600),
      hFrames: 11,
      vFrames: 1,
      frame: 0,
    });
    this.speedUpgrade = new Sprite({
      asset: assets.images.speedUpgrade,
      frameSize: new Vector2(900, 600),
      hFrames: 11,
      vFrames: 1,
      frame: 0,
    });
    this.healthPlusButton = {
      x: canvasMidX + 263,
      y: canvasMidY - 148,
      width: 35,
      height: 35,
    };
    this.damagePlusButton = {
      x: canvasMidX + 263,
      y: canvasMidY - 31,
      width: 35,
      height: 35,
    };
    this.speedPlusButton = {
      x: canvasMidX + 263,
      y: canvasMidY + 86,
      width: 35,
      height: 35,
    };
  }

  draw() {
    super.drawImage(c, this.position.x, this.position.y);
    if (this.currentTab === "upgrade") {
      this.healthUpgrade.drawImage(c, this.position.x, this.position.y);
      this.damageUpgrade.drawImage(c, this.position.x, this.position.y);
      this.speedUpgrade.drawImage(c, this.position.x, this.position.y);
    }
    // c.fillStyle = "red"; // Red button for close
    // c.fillRect(
    //   this.healthPlusButton.x,
    //   this.healthPlusButton.y,
    //   this.healthPlusButton.width,
    //   this.healthPlusButton.height
    // );
  }
}

export default StationUI;
