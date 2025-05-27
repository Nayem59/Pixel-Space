import { gameState, gameStateFromLS, menuState } from "../main.js";
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
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 36,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 421,
      width: 67,
      height: 60,
    };
    this.linkedInButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 110,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 421,
      width: 55,
      height: 60,
    };
    this.gitHubButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 172,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 421,
      width: 59,
      height: 60,
    };
    this.settingsButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 307,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 421,
      width: 59,
      height: 60,
    };
    this.volumeButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 162,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 78,
      width: 60,
      height: 53,
    };
    this.volumeUpButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 305,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 94,
      width: 12,
      height: 20,
    };
    this.volumeDownButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 260,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 94,
      width: 12,
      height: 20,
    };
    this.backButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 30,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 18,
      width: 46,
      height: 37,
    };
    this.resetButton = {
      x: menuCanvas.width / 2 - this.frameSize.x / 2 + 339,
      y: menuCanvas.height / 2 - this.frameSize.y / 2 + 119,
      width: 44,
      height: 16,
    };
  }

  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
  }

  draw() {
    super.drawImage(cM, this.position.x, this.position.y);
    // cM.fillStyle = "red";
    // cM.fillRect(
    //   this.volumeButton.x,
    //   this.volumeButton.y,
    //   this.volumeButton.width,
    //   this.volumeButton.height
    // );
    if (this.frame === 6) {
      cM.save();
      cM.font = "15px pixel";
      cM.fillStyle = "white";
      cM.fillText(
        this.formatTime(
          gameState?.timePlayed ?? gameStateFromLS?.timePlayed ?? 0
        ),
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 76
      );
      cM.fillText(
        gameState?.enemiesKilled ?? gameStateFromLS?.enemiesKilled ?? 0,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 90
      );
      cM.fillText(
        gameState?.bossesKilled ?? gameStateFromLS?.bossesKilled ?? 0,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 104
      );
      cM.fillText(
        gameState?.damageDealt ?? gameStateFromLS?.damageDealt ?? 0,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 117
      );
      cM.fillText(
        (gameState?.accuracy ?? gameStateFromLS?.accuracy ?? 0) + "%",
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 131
      );
      cM.fillText(
        gameState?.criticalHits ?? gameStateFromLS?.criticalHits ?? 0,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 145
      );
      cM.fillText(
        gameState?.healthLost ?? gameStateFromLS?.healthLost ?? 0,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 159
      );
      cM.fillText(
        gameState?.goldEarned ?? gameStateFromLS?.goldEarned ?? 0,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 173
      );
      cM.fillText(
        gameState?.gemsCollected ?? gameStateFromLS?.gemsCollected ?? 0,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 187
      );
      cM.fillText(
        gameState?.potionUsed ?? gameStateFromLS?.potionUsed ?? 0,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 201
      );
      cM.fillText(
        gameState?.missilesLaunched ?? gameStateFromLS?.missilesLaunched ?? 0,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 215
      );
      cM.fillText(
        gameState?.boostUsed ?? gameStateFromLS?.boostUsed ?? 0,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 229
      );
      cM.fillText(
        gameState?.shieldActivated ?? gameStateFromLS?.shieldActivated ?? 0,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 243
      );
      cM.fillText(
        gameState?.cloakingUsed ?? gameStateFromLS?.cloakingUsed ?? 0,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 257
      );
      cM.fillText(
        (gameState?.laserDuration.toFixed() ??
          gameStateFromLS?.laserDuration.toFixed() ??
          0) + "s",
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 271
      );
      cM.fillText(
        (gameState?.upgradesUnlocked ??
          gameStateFromLS?.upgradesUnlocked ??
          0) + "/33",
        menuCanvas.width / 2 - this.frameSize.x / 2 + 295,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 285
      );
      cM.restore();
    }
    if (this.frame === 8) {
      cM.save();
      cM.font = "15px pixel";
      cM.fillStyle = "white";
      cM.fillText(
        menuState?.volume,
        menuCanvas.width / 2 - this.frameSize.x / 2 + 279,
        menuCanvas.height / 2 - this.frameSize.y / 2 + 108
      );
      cM.restore();
    }
    if (this.frame === 8 && menuState.volume === 0) {
      cM.save();

      cM.restore();
    }
  }
}

export default MenuUI;
