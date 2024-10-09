import { canvasMidX, canvasMidY, gameState, storeState } from "../main.js";
import { assets } from "../utils/assets.js";
import { c } from "../utils/canvas.js";
import Sprite from "./Sprite.js";
import Vector2 from "./Vector2.js";

class StationUI extends Sprite {
  constructor(spriteConfig) {
    super(spriteConfig);
    this.greenTick = new Sprite({
      asset: assets.images.greenTick,
      frameSize: new Vector2(48, 48),
      hFrames: 1,
      vFrames: 1,
      frame: 0,
    });
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

    this.healthPotionItem = {
      x: canvasMidX - this.frameSize.x / 2 + 50,
      y: canvasMidY - this.frameSize.y / 2 + 112,
      width: 111,
      height: 127,
    };
    this.homingMissileItem = {
      x: canvasMidX - this.frameSize.x / 2 + 179,
      y: canvasMidY - this.frameSize.y / 2 + 112,
      width: 111,
      height: 127,
    };
    this.speedBoostItem = {
      x: canvasMidX - this.frameSize.x / 2 + 308,
      y: canvasMidY - this.frameSize.y / 2 + 112,
      width: 111,
      height: 127,
    };
    this.bubbleShieldItem = {
      x: canvasMidX - this.frameSize.x / 2 + 437,
      y: canvasMidY - this.frameSize.y / 2 + 112,
      width: 111,
      height: 127,
    };
    this.cloakingDeviceItem = {
      x: canvasMidX - this.frameSize.x / 2 + 566,
      y: canvasMidY - this.frameSize.y / 2 + 112,
      width: 111,
      height: 127,
    };
    this.autoTurretUpgrade = {
      x: canvasMidX - this.frameSize.x / 2 + 50,
      y: canvasMidY - this.frameSize.y / 2 + 307,
      width: 111,
      height: 127,
    };
    this.twinTurretUpgrade = {
      x: canvasMidX - this.frameSize.x / 2 + 308,
      y: canvasMidY - this.frameSize.y / 2 + 307,
      width: 111,
      height: 127,
    };
    this.laserGunUpgrade = {
      x: canvasMidX - this.frameSize.x / 2 + 566,
      y: canvasMidY - this.frameSize.y / 2 + 307,
      width: 111,
      height: 127,
    };
    this.coinBuyButton = {
      x: canvasMidX - this.frameSize.x / 2 + 746,
      y: canvasMidY - this.frameSize.y / 2 + 163,
      width: 105,
      height: 118,
    };
    this.gemBuyButton = {
      x: canvasMidX - this.frameSize.x / 2 + 746,
      y: canvasMidY - this.frameSize.y / 2 + 379,
      width: 105,
      height: 118,
    };
  }

  draw() {
    super.drawImage(c, this.position.x, this.position.y);
    if (this.currentTab === "upgrade") {
      this.healthUpgrade.drawImage(c, this.position.x, this.position.y);
      this.damageUpgrade.drawImage(c, this.position.x, this.position.y);
      this.speedUpgrade.drawImage(c, this.position.x, this.position.y);
    }

    c.font = "20px pixel";
    if (this.currentTab === "shop") {
      c.fillStyle = "#7DF9FF";
      c.fillText(
        storeState.potionCount,
        canvasMidX - this.frameSize.x / 2 + 125,
        canvasMidY - this.frameSize.y / 2 + 224
      );
      c.fillText(
        storeState.missileCount,
        canvasMidX - this.frameSize.x / 2 + 255,
        canvasMidY - this.frameSize.y / 2 + 224
      );
      c.fillText(
        storeState.boostCount,
        canvasMidX - this.frameSize.x / 2 + 380,
        canvasMidY - this.frameSize.y / 2 + 224
      );
      c.fillText(
        storeState.shieldCount,
        canvasMidX - this.frameSize.x / 2 + 512,
        canvasMidY - this.frameSize.y / 2 + 224
      );
      c.fillText(
        storeState.cloakCount,
        canvasMidX - this.frameSize.x / 2 + 641,
        canvasMidY - this.frameSize.y / 2 + 224
      );

      if (storeState.hasContinuousFire) {
        this.greenTick.drawImage(
          c,
          canvasMidX - this.frameSize.x / 2 + 110,
          canvasMidY - this.frameSize.y / 2 + 385
        );
      }
      if (storeState.hasTwinTurret) {
        this.greenTick.drawImage(
          c,
          canvasMidX - this.frameSize.x / 2 + 368,
          canvasMidY - this.frameSize.y / 2 + 385
        );
      }
      if (storeState.hasLaser) {
        this.greenTick.drawImage(
          c,
          canvasMidX - this.frameSize.x / 2 + 626,
          canvasMidY - this.frameSize.y / 2 + 385
        );
      }

      if (!storeState.hasContinuousFire) {
        c.save();
        c.globalAlpha = 0.8;
        c.fillStyle = "black";
        c.fillRect(
          this.twinTurretUpgrade.x,
          this.twinTurretUpgrade.y,
          this.twinTurretUpgrade.width,
          this.twinTurretUpgrade.height
        );
        c.restore();
      }
      if (!storeState.hasTwinTurret) {
        c.save();
        c.globalAlpha = 0.8;
        c.fillStyle = "black";
        c.fillRect(
          this.laserGunUpgrade.x,
          this.laserGunUpgrade.y,
          this.laserGunUpgrade.width,
          this.laserGunUpgrade.height
        );
        c.restore();
      }
    }

    c.fillStyle = "white";
    c.fillText(
      gameState.coins,
      canvasMidX - this.frameSize.x / 2 + 196,
      canvasMidY - this.frameSize.y / 2 + 555
    );
    c.fillText(
      gameState.gems,
      canvasMidX - this.frameSize.x / 2 + 450,
      canvasMidY - this.frameSize.y / 2 + 555
    );

    //   c.fillStyle = "red"; // Red button for close
    //   c.fillRect(
    //     this.healthPotionItem.x,
    //     this.healthPotionItem.y,
    //     this.healthPotionItem.width,
    //     this.healthPotionItem.height
    //   );
    //   c.fillRect(
    //     this.homingMissileItem.x,
    //     this.homingMissileItem.y,
    //     this.homingMissileItem.width,
    //     this.homingMissileItem.height
    //   );
    //   c.fillRect(
    //     this.speedBoostItem.x,
    //     this.speedBoostItem.y,
    //     this.speedBoostItem.width,
    //     this.speedBoostItem.height
    //   );
    //   c.fillRect(
    //     this.bubbleShieldItem.x,
    //     this.bubbleShieldItem.y,
    //     this.bubbleShieldItem.width,
    //     this.bubbleShieldItem.height
    //   );
    //   c.fillRect(
    //     this.cloakingDeviceItem.x,
    //     this.cloakingDeviceItem.y,
    //     this.cloakingDeviceItem.width,
    //     this.cloakingDeviceItem.height
    //   );
    //   c.fillRect(
    //     this.autoTurretUpgrade.x,
    //     this.autoTurretUpgrade.y,
    //     this.autoTurretUpgrade.width,
    //     this.autoTurretUpgrade.height
    //   );
    //   c.fillRect(
    //     this.twinTurretUpgrade.x,
    //     this.twinTurretUpgrade.y,
    //     this.twinTurretUpgrade.width,
    //     this.twinTurretUpgrade.height
    //   );
    //   c.fillRect(
    //     this.laserGunUpgrade.x,
    //     this.laserGunUpgrade.y,
    //     this.laserGunUpgrade.width,
    //     this.laserGunUpgrade.height
    //   );
    //   c.fillRect(
    //     this.coinBuyButton.x,
    //     this.coinBuyButton.y,
    //     this.coinBuyButton.width,
    //     this.coinBuyButton.height
    //   );
    //   c.fillRect(
    //     this.gemBuyButton.x,
    //     this.gemBuyButton.y,
    //     this.gemBuyButton.width,
    //     this.gemBuyButton.height
    //   );
  }
}

export default StationUI;
