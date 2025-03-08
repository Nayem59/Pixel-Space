import { c, canvas, menuCanvas } from "./utils/canvas.js";
import { assets } from "./utils/assets.js";
import { sounds } from "./utils/sounds.js";
import Player from "./classes/Player.js";
import Particle from "./classes/Particle.js";
import Turret from "./classes/Turret.js";
import {
  handlePlayerRotation,
  handlePlayerVelocity,
  handleShipExFireAnimation,
  handleTrail,
  mouseX,
  mouseY,
  stopEngineSound,
  toggleMenu,
} from "./utils/inputs.js";
import Sprite from "./classes/Sprite.js";
import Vector2 from "./classes/Vector2.js";
import Camera from "./classes/Camera.js";
import MiniMap from "./classes/MiniMap.js";
import TileMap from "./classes/TileMap.js";
import GameState from "./classes/GameState.js";
import HealthBar from "./classes/HealthBar.js";
import CoinUI from "./classes/CoinUI.js";
import GemUI from "./classes/GemUI.js";
import Planet from "./classes/Planet.js";
import SpaceStation from "./classes/SpaceStation.js";
import StationUI from "./classes/StationUI.js";
import StoreState from "./classes/StoreState.js";
import Text from "./classes/Text.js";
import Explosion from "./classes/Explosion.js";
import {
  resolveCollision,
  spawnEnemies,
  enemyTimeOutId,
  dropCoins,
  dropGem,
  resolvePlayerDamage,
  drawFPSIndicator,
  processAccuracy,
} from "./utils/utils.js";
import SkillUI from "./classes/SkillUI.js";
import Laser from "./classes/Laser.js";
import MenuUI from "./classes/MenuUI.js";
import MenuState from "./classes/MenuState.js";

export const scoreEl = document.querySelector("#score");
export const endScore = document.querySelector("#endScore");
export const collectableContainer = document.querySelector(
  ".collectable-container"
);
export const scoreContainer = document.querySelector(".score-container");
export const coinEl = document.querySelector("#coin");
export const gemEl = document.querySelector("#gem");
export const pauseEl = document.querySelector("#pause");
export const menuState = new MenuState();
export const menuUI = new MenuUI({
  asset: assets.images.menuUI,
  frameSize: new Vector2(400, 500),
  hFrames: 7,
  vFrames: 1,
  frame: localStorage.getItem("gameState") !== null ? 1 : 0,
  position: new Vector2(
    menuCanvas.width / 2 - 200,
    menuCanvas.height / 2 - 250
  ),
});
export const friction = 0.98;

// Instantiation
export let gameStateFromLS;
export let storeStateFromLS;
export const canvasMidX = canvas.width / 2;
export const canvasMidY = canvas.height / 2;
export let gameState;
export let storeState;
export let player;
export let turret;
export let shipExFire;
export let shield;
let turretAngle = 0;

export let tileMap;
export let map;
export let camera;
let miniMap;

let live;
let coinUI;
let gemUI;
export let skillUI;
export let stationUI;
export let coins = [];
let coinsEffects = [];
let gemsEffects = [];
export let gems = [];
let yellowPlanet;
export let spaceStation1;

export let projectiles = [];
export let lasers = [];
export let missiles = [];
export let enemies = [];
let particles = [];
let explosions = [];
export let trails = [];
export let texts = [];

function init() {
  gameState = new GameState();
  storeState = new StoreState();
  delta = 0;
  oldTimeStamp = 0;
  if (assets.images.spaceBg1.isLoaded) {
    map = new TileMap(assets.getSpaceBgImages(), 2048, 2048, 5, 3);
    camera = new Camera(canvas.width, canvas.height, map);
    player = new Player(
      canvasMidX,
      canvasMidY,
      22,
      "blue",
      { x: 0, y: 0 },
      map
    );
  }
  yellowPlanet = new Planet(250, {
    asset: assets.images.yellowPlanet,
    frameSize: new Vector2(500, 500),
    hFrames: 1,
    vFrames: 1,
    frame: 0,
    position: new Vector2(2000, 3000),
  });
  spaceStation1 = new SpaceStation(280, {
    asset: assets.images.spaceStation1,
    frameSize: new Vector2(520, 520),
    hFrames: 1,
    vFrames: 1,
    frame: 0,
    position: new Vector2(1000, 1000),
  });
  turret = new Turret(player.x, player.y, turretAngle, {
    asset: assets.images.turret,
    frameSize: new Vector2(64, 64),
    hFrames: 8,
    vFrames: 1,
    frame: 0,
  });
  shipExFire = new Sprite({
    asset: assets.images.shipExhaustFire,
    frameSize: new Vector2(48, 48),
    hFrames: 4,
    vFrames: 2,
    frame: 0,
  });
  shield = new Sprite({
    asset: assets.images.shield,
    frameSize: new Vector2(80, 80),
    hFrames: 1,
    vFrames: 1,
    frame: 0,
  });
  miniMap = new MiniMap(canvas.width, canvas.height);
  live = new HealthBar(5, 25, {
    asset: assets.images.live,
    frameSize: new Vector2(176, 44),
    hFrames: 8,
    vFrames: 3,
    frame: 0,
  });
  coinUI = new CoinUI(canvas.width - 115, 3, {
    asset: assets.images.coinUI,
    frameSize: new Vector2(48, 48),
    hFrames: 1,
    vFrames: 1,
    frame: 0,
  });
  gemUI = new GemUI(canvas.width - 115, 57, {
    asset: assets.images.gemUI,
    frameSize: new Vector2(48, 48),
    hFrames: 1,
    vFrames: 1,
    frame: 0,
  });
  stationUI = new StationUI({
    asset: assets.images.stationUI,
    frameSize: new Vector2(900, 600),
    hFrames: 2,
    vFrames: 1,
    frame: 0,
  });
  skillUI = new SkillUI(canvasMidX - 250, canvas.height - 100, {
    asset: assets.images.skillUI,
    frameSize: new Vector2(500, 100),
    hFrames: 1,
    vFrames: 1,
    frame: 0,
  });
  projectiles = [];
  lasers = [];
  lasers.push(new Laser(0, 0, 0, 0));
  missiles = [];
  enemies = [];
  particles = [];
  explosions = [];
  trails = [];
  coins = [];
  coinsEffects = [];
  gemsEffects = [];
  gems = [];
  texts = [];
  gameState.updateState();
  sounds.loopSound("ambient1", 0.3);
}

// main game loop
let animationId;
let delta = 0;
let oldTimeStamp = 0;

let fps = 0;
let lastFpsUpdate = 0;
let frameCount = 0;

function gameLoop(timeStamp) {
  animationId = requestAnimationFrame(gameLoop);

  if (gameState.isPaused) {
    oldTimeStamp = timeStamp;
    return;
  }

  // Calculate delta aka how many seconds has passed (milliseconds)
  delta = (timeStamp - oldTimeStamp) / 10;
  // delta = 1;
  oldTimeStamp = timeStamp;
  delta = Math.min(delta, 10);

  gameState.timePlayed += delta / 100;

  if (gameState.openStation) {
    stationUI.draw();
    return;
  }

  // Update FPS (every second)
  frameCount++;
  if (timeStamp - lastFpsUpdate >= 100) {
    fps = Math.round(frameCount / ((timeStamp - lastFpsUpdate) / 1000));
    lastFpsUpdate = timeStamp;
    frameCount = 0;
  }

  handlePlayerVelocity();
  handlePlayerRotation();
  handleShipExFireAnimation(delta);
  player.update(delta);
  handleTrail(delta);
  camera.update(player);

  c.clearRect(0, 0, canvas.width, canvas.height);
  map.draw(c, camera);

  c.save();
  c.translate(-camera.x, -camera.y);

  yellowPlanet.draw();
  spaceStation1.draw();
  // update turret
  const adjustedMouseX = mouseX + camera.x;
  const adjustedMouseY = mouseY + camera.y;
  turretAngle = Math.atan2(
    adjustedMouseY - player.y,
    adjustedMouseX - player.x
  );
  turret.x = player.x;
  turret.y = player.y;
  turret.angle = turretAngle;
  turret.animate(delta);

  // projectile update
  projectiles.forEach((projectile, projIndex) => {
    projectile.update(delta);

    const distPlPro = Math.hypot(
      projectile.x - player.x,
      projectile.y - player.y
    );
    if (distPlPro - player.radius - projectile.radius < -2) {
      if (!player.shieldActive) {
        gameState.takeDamage(1);
        live.startAnimation();
        camera.damageDuration = 10;
      }

      resolveCollision(player, projectile);

      projectiles.splice(projIndex, 1);

      if (gameState.playerHealth === 0) {
        setTimeout(() => {
          clearGameCanvas();
          toggleMenu(true);
          menuUI.frame = 3;
          menuUI.draw();
        }, 300);
      }
    } else {
      const distProj = Math.hypot(
        projectile.originalX - projectile.x,
        projectile.originalY - projectile.y
      );

      if (projectile.type === "enemy") {
        if (distProj > 700) {
          projectiles.splice(projIndex, 1);
        }
      } else {
        if (distProj > 300) {
          projectiles.splice(projIndex, 1);
          gameState.projectilesMissed++;
          processAccuracy();
        }
      }
    }
  });

  missiles.forEach((missile, missileIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (enemy.isMarked) {
        missile.moveToTarget(enemy);
      }
    });

    missile.update(delta);

    if (missile.lifeSpan < 1) {
      explosions.push(
        new Explosion(missile.x, missile.y, 30, {
          asset:
            Math.random() < 0.5
              ? assets.images.explosion1
              : assets.images.explosion2,
          frameSize: new Vector2(48, 48),
          hFrames: 8,
          vFrames: 1,
          frame: 0,
          scale: 2,
        })
      );
      missiles.splice(missileIndex, 1);
    }
  });

  lasers[0].update(delta);

  const currentTime = Date.now();
  const enemiesToRemove = [];
  // enemy update and handle all collisions with enemy
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update(delta);

    const distPlEn = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    // reduce hp if the enemy collides with player, end game if hp is 0
    if (distPlEn - enemy.radius - player.radius < -2) {
      if (!player.shieldActive) {
        gameState.takeDamage(1);
        live.startAnimation();
        camera.damageDuration = 10;
      }

      resolveCollision(player, enemy);

      enemiesToRemove.push(enemyIndex);

      if (gameState.playerHealth === 0) {
        setTimeout(() => {
          clearGameCanvas();
          toggleMenu(true);
          menuUI.frame = 3;
          menuUI.draw();
        }, 300);
      }
    }

    const projectilesToRemove = [];
    projectiles.forEach((projectile, projectileIndex) => {
      if (projectile.type !== "enemy") {
        const distEnPro = Math.hypot(
          projectile.x - enemy.x,
          projectile.y - enemy.y
        );
        if (distEnPro - enemy.radius - projectile.radius < -2) {
          const { playerDamage, criticalHit } = resolvePlayerDamage();
          texts.push(
            new Text(enemy.x, enemy.y, playerDamage * -1, criticalHit)
          );
          enemy.health -= playerDamage;
          gameState.damageDealt += playerDamage;
          for (let i = 0; i < 10; i++) {
            particles.push(
              new Particle(
                projectile.x,
                projectile.y,
                Math.random() * 3,
                enemy.color,
                {
                  x: (Math.random() - 0.5) * (Math.random() * 5),
                  y: (Math.random() - 0.5) * (Math.random() * 5),
                }
              )
            );
          }
          gameState.projectilesHit++;
          processAccuracy();

          if (enemy.health > 0) {
            gameState.score += 100;
            enemy.hit = true;
            enemy.startAnimation();
          } else {
            if (!enemy.destroyed) {
              gameState.score += 250;
              enemy.destroyed = true;
              enemiesToRemove.push(enemyIndex);
              Math.random() < 0.1 ? dropGem(enemy) : dropCoins(enemy);
            }
          }
          projectilesToRemove.push(projectileIndex);
          // Apply knockBack to enemy
          const knockBackStrength = 2;
          const knockBackAngle = Math.atan2(
            enemy.y - projectile.y,
            enemy.x - projectile.x
          );
          enemy.velocity.x += Math.cos(knockBackAngle) * knockBackStrength;
          enemy.velocity.y += Math.sin(knockBackAngle) * knockBackStrength;
        }
      }
    });
    projectilesToRemove
      .sort((a, b) => b - a)
      .forEach((index) => {
        projectiles.splice(index, 1);
      });

    missiles.forEach((missile, missileIndex) => {
      const distEnMissile = Math.hypot(
        missile.x - enemy.x,
        missile.y - enemy.y
      );

      if (distEnMissile - enemy.radius - missile.radius < -2) {
        explosions.push(
          new Explosion(enemy.x, enemy.y, 30, {
            asset:
              Math.random() < 0.5
                ? assets.images.explosion1
                : assets.images.explosion2,
            frameSize: new Vector2(48, 48),
            hFrames: 8,
            vFrames: 1,
            frame: 0,
            scale: 2,
          })
        );
        missiles.splice(missileIndex, 1);
      }
    });

    explosions.forEach((explosion, explosionIndex) => {
      const distEnExplosion = Math.hypot(
        explosion.x - enemy.x,
        explosion.y - enemy.y
      );

      if (distEnExplosion - enemy.radius - explosion.radius < -2) {
        if (enemy.canTakeDamage(currentTime)) {
          const { playerDamage, criticalHit } = resolvePlayerDamage();
          texts.push(
            new Text(
              enemy.x,
              enemy.y,
              playerDamage * explosion.damageMultiplier * -1,
              criticalHit
            )
          );
          enemy.takeDamage(
            playerDamage * explosion.damageMultiplier,
            currentTime
          );
          gameState.damageDealt += playerDamage;
          for (let i = 0; i < 10; i++) {
            particles.push(
              new Particle(
                explosion.x,
                explosion.y,
                Math.random() * 3,
                enemy.color,
                {
                  x: (Math.random() - 0.5) * (Math.random() * 5),
                  y: (Math.random() - 0.5) * (Math.random() * 5),
                }
              )
            );
          }

          if (enemy.health > 0) {
            gameState.score += 100;
            resolveCollision(explosion, enemy);
            enemy.hit = true;
            enemy.startAnimation();
          } else {
            if (!enemy.destroyed) {
              gameState.score += 250;
              enemy.destroyed = true;
              enemiesToRemove.push(enemyIndex);
              Math.random() < 0.1 ? dropGem(enemy) : dropCoins(enemy);
            }
          }
        }
      }
    });

    if (
      lasers[0].active &&
      enemy.visible &&
      enemy.isMarked &&
      !lasers[0].overCharged
    ) {
      lasers[0].x1 = player.x;
      lasers[0].y1 = player.y;
      lasers[0].x2 = enemy.x;
      lasers[0].y2 = enemy.y;
      lasers[0].charge(delta);
      lasers[0].draw();

      if (enemy.canTakeLaserDamage(currentTime)) {
        const { playerDamage, criticalHit } = resolvePlayerDamage();
        texts.push(
          new Text(enemy.x, enemy.y, (playerDamage / 2) * -1, criticalHit)
        );
        enemy.takeLaserDamage(playerDamage / 2, currentTime);
        gameState.damageDealt += playerDamage / 2;

        if (enemy.health > 0) {
          gameState.score += 40;
          enemy.hit = true;
          enemy.startAnimation();
        } else {
          for (let i = 0; i < 10; i++) {
            particles.push(
              new Particle(enemy.x, enemy.y, Math.random() * 3, enemy.color, {
                x: (Math.random() - 0.5) * (Math.random() * 5),
                y: (Math.random() - 0.5) * (Math.random() * 5),
              })
            );
          }
          if (!enemy.destroyed) {
            gameState.score += 250;
            enemy.destroyed = true;
            lasers[0].active = false;
            enemiesToRemove.push(enemyIndex);
            Math.random() < 0.1 ? dropGem(enemy) : dropCoins(enemy);
          }
        }
      }
    }
  });
  enemiesToRemove
    .sort((a, b) => b - a)
    .forEach((index) => {
      if (gameState.lastMarkedEnemy === enemies[index]) {
        gameState.lastMarkedEnemy = null;
      }
      enemies[index].chasingSound.pause();
      enemies.splice(index, 1);
      gameState.enemiesKilled++;
    });

  // particles update
  particles.forEach((particle, partIndex) => {
    if (particle.alpha <= 0) {
      particles.splice(partIndex, 1);
    } else {
      particle.update(delta);
    }
  });

  // explosions update
  explosions.forEach((explosion, explosionIndex) => {
    if (explosion.destroy) {
      explosions.splice(explosionIndex, 1);
    } else {
      explosion.update(delta);
    }
  });

  // text update
  texts.forEach((text, textIndex) => {
    if (text.alpha <= 0) {
      texts.splice(textIndex, 1);
    } else {
      text.update(delta);
    }
  });

  coins.forEach((coin, coinIndex) => {
    if (coin.destroyed) {
      coins.splice(coinIndex, 1);
    } else {
      coin.isAnimating = true;
      coin.update(delta);
      const distCoinPlayer = Math.hypot(player.x - coin.x, player.y - coin.y);
      if (distCoinPlayer - player.radius - coin.radius < -2) {
        const coinEffect = coin.createCollectionEffect();
        coinEffect.isAnimating = true;
        coinsEffects.push(coinEffect);
        sounds.playSound("coinSound");
        coins.splice(coinIndex, 1);
        gameState.addCoin();
      }
    }
  });
  gems.forEach((gem, gemIndex) => {
    if (gem.destroyed) {
      gems.splice(gemIndex, 1);
    } else {
      gem.isAnimating = true;
      gem.update(delta);
      const distGemPlayer = Math.hypot(player.x - gem.x, player.y - gem.y);
      if (distGemPlayer - player.radius - gem.radius < -2) {
        const gemEffect = gem.createCollectionEffect();
        gemEffect.isAnimating = true;
        gemsEffects.push(gemEffect);
        sounds.playSound("gemSound");
        gems.splice(gemIndex, 1);
        gameState.addGem();
      }
    }
  });

  coinsEffects.forEach((coinEffect, coinEffectIndex) => {
    coinEffect.animate(delta);
    if (!coinEffect.isAnimating) {
      coinsEffects.splice(coinEffectIndex, 1);
    } else {
      c.shadowColor = "yellow";
      c.shadowBlur = 10;
      coinEffect.drawImage(
        c,
        coinEffect.position.x - 8,
        coinEffect.position.y - 8
      );
    }
  });

  gemsEffects.forEach((gemEffect, gemEffectIndex) => {
    gemEffect.animate(delta);
    if (!gemEffect.isAnimating) {
      gemsEffects.splice(gemEffectIndex, 1);
    } else {
      c.shadowColor = "#7DF9FF";
      c.shadowBlur = 10;
      gemEffect.drawImage(
        c,
        gemEffect.position.x - 8,
        gemEffect.position.y - 8
      );
    }
  });

  c.restore();
  trails.forEach((trail, trailIndex) => {
    if (trail.alpha <= 0) {
      trails.splice(trailIndex, 1);
    } else {
      trail.update(delta);
    }
  });
  camera.showDamage(c);
  player.draw();
  turret.draw();
  miniMap.draw();

  if (!live.isAnimating) {
    live.frame = live.healthMap[gameState.playerHealth];
  }
  gameState.updateState();
  live.update(delta);
  coinUI.draw();
  gemUI.draw();
  skillUI.update(delta);
  drawFPSIndicator(c, fps);
}

function clearGameCanvas() {
  cancelAnimationFrame(animationId);
  clearTimeout(enemyTimeOutId);
  canvas.style.display = "none";
  collectableContainer.style.display = "none";
  scoreContainer.style.display = "none";
}

// start of the menu
addEventListener("load", async () => {
  const loadingElement = document.getElementById("loading");

  try {
    // Wait for all assets and sounds to load
    await Promise.all([assets.loadAll(), sounds.loadAll()]);

    loadingElement.style.display = "none";
    menuUI.draw(); // Draw the menu UI immediately
    menuState.menuOpen = true;
    gameStateFromLS = JSON.parse(localStorage.getItem("gameState"));
    storeStateFromLS = JSON.parse(localStorage.getItem("storeState"));
  } catch (error) {
    console.error("Error loading assets or sounds:", error);
  }
});

menuCanvas.addEventListener("mouseup", (e) => {
  if (e.button === 0) {
    if (
      menuState.menuOpen &&
      (menuUI.frame === 0 ||
        menuUI.frame === 1 ||
        menuUI.frame === 2 ||
        menuUI.frame === 3)
    ) {
      if (
        mouseX >= menuUI.statsControlsButton.x &&
        mouseX <=
          menuUI.statsControlsButton.x + menuUI.statsControlsButton.width &&
        mouseY >= menuUI.statsControlsButton.y &&
        mouseY <=
          menuUI.statsControlsButton.y + menuUI.statsControlsButton.height
      ) {
        menuState.lastFrame = menuUI.frame;
        menuUI.frame = 6;
        menuUI.draw();
        return;
      }
      if (
        mouseX >= menuUI.creditsButton.x &&
        mouseX <= menuUI.creditsButton.x + menuUI.creditsButton.width &&
        mouseY >= menuUI.creditsButton.y &&
        mouseY <= menuUI.creditsButton.y + menuUI.creditsButton.height
      ) {
        menuState.lastFrame = menuUI.frame;
        menuUI.frame = 5;
        menuUI.draw();
        return;
      }
    }
    if (menuState.menuOpen && menuUI.frame === 0) {
      // start of a new game
      if (
        mouseX >= menuUI.newGameButton.x &&
        mouseX <= menuUI.newGameButton.x + menuUI.newGameButton.width &&
        mouseY >= menuUI.newGameButton.y &&
        mouseY <= menuUI.newGameButton.y + menuUI.newGameButton.height
      ) {
        localStorage.clear();
        init();
        gameLoop(0);
        spawnEnemies();
        collectableContainer.style.display = "block";
        scoreContainer.style.display = "block";
        toggleMenu(false);
        return;
      }
    }
    if (menuState.menuOpen && menuUI.frame === 1) {
      if (
        mouseX >= menuUI.resumeGameButton.x &&
        mouseX <= menuUI.resumeGameButton.x + menuUI.resumeGameButton.width &&
        mouseY >= menuUI.resumeGameButton.y &&
        mouseY <= menuUI.resumeGameButton.y + menuUI.resumeGameButton.height
      ) {
        // handle fetching data form local storage from here
        gameStateFromLS = JSON.parse(localStorage.getItem("gameState"));
        storeStateFromLS = JSON.parse(localStorage.getItem("storeState"));
        init();
        gameState.setStateFromLS(gameStateFromLS);
        storeState.setStateFromLS(storeStateFromLS);
        gameLoop(0);
        spawnEnemies();
        canvas.style.display = "block";
        collectableContainer.style.display = "block";
        scoreContainer.style.display = "block";
        toggleMenu(false);
        return;
      }
    }
    if (menuState.menuOpen && menuUI.frame === 2) {
      if (
        mouseX >= menuUI.resumeButton.x &&
        mouseX <= menuUI.resumeButton.x + menuUI.resumeButton.width &&
        mouseY >= menuUI.resumeButton.y &&
        mouseY <= menuUI.resumeButton.y + menuUI.resumeButton.height
      ) {
        gameState.isPaused = false;
        sounds.resumePausedSounds();
        stopEngineSound();
        toggleMenu(false);
        return;
      }
      if (
        mouseX >= menuUI.newGameButton.x &&
        mouseX <= menuUI.newGameButton.x + menuUI.newGameButton.width &&
        mouseY >= menuUI.newGameButton.y &&
        mouseY <= menuUI.newGameButton.y + menuUI.newGameButton.height
      ) {
        menuUI.frame = 4;
        menuUI.draw();
        return;
      }
      if (
        mouseX >= menuUI.saveGameButton.x &&
        mouseX <= menuUI.saveGameButton.x + menuUI.saveGameButton.width &&
        mouseY >= menuUI.saveGameButton.y &&
        mouseY <= menuUI.saveGameButton.y + menuUI.saveGameButton.height
      ) {
        console.log("game saved, handle saving state to browser");
        gameState.saveGameStateToLS();
        storeState.saveStoreStateToLS();
        clearGameCanvas();
        menuUI.frame = 1;
        menuUI.draw();
        return;
      }
    }
    if (menuState.menuOpen && menuUI.frame === 3) {
      if (
        mouseX >= menuUI.newGameButton.x &&
        mouseX <= menuUI.newGameButton.x + menuUI.newGameButton.width &&
        mouseY >= menuUI.newGameButton.y &&
        mouseY <= menuUI.newGameButton.y + menuUI.newGameButton.height
      ) {
        localStorage.clear();
        init();
        gameLoop(0);
        spawnEnemies();
        canvas.style.display = "block";
        collectableContainer.style.display = "block";
        scoreContainer.style.display = "block";
        toggleMenu(false);
        return;
      }
    }
    if (menuState.menuOpen && menuUI.frame === 4) {
      if (
        mouseX >= menuUI.yesButton.x &&
        mouseX <= menuUI.yesButton.x + menuUI.yesButton.width &&
        mouseY >= menuUI.yesButton.y &&
        mouseY <= menuUI.yesButton.y + menuUI.yesButton.height
      ) {
        localStorage.clear();
        clearGameCanvas();
        canvas.style.display = "block";
        collectableContainer.style.display = "block";
        scoreContainer.style.display = "block";
        init();
        gameLoop(0);
        spawnEnemies();
        toggleMenu(false);
        return;
      }
      if (
        mouseX >= menuUI.noButton.x &&
        mouseX <= menuUI.noButton.x + menuUI.noButton.width &&
        mouseY >= menuUI.noButton.y &&
        mouseY <= menuUI.noButton.y + menuUI.noButton.height
      ) {
        menuUI.frame = 2;
        menuUI.draw();
        return;
      }
    }
    if (menuState.menuOpen && menuUI.frame === 5) {
      if (
        mouseX >= menuUI.backButton.x &&
        mouseX <= menuUI.backButton.x + menuUI.backButton.width &&
        mouseY >= menuUI.backButton.y &&
        mouseY <= menuUI.backButton.y + menuUI.backButton.height
      ) {
        menuUI.frame = menuState.lastFrame;
        menuUI.draw();
        return;
      }
    }
    if (menuState.menuOpen && menuUI.frame === 6) {
      if (
        mouseX >= menuUI.backButton.x &&
        mouseX <= menuUI.backButton.x + menuUI.backButton.width &&
        mouseY >= menuUI.backButton.y &&
        mouseY <= menuUI.backButton.y + menuUI.backButton.height
      ) {
        menuUI.frame = menuState.lastFrame;
        menuUI.draw();
        return;
      }
      if (
        mouseX >= menuUI.resetButton.x &&
        mouseX <= menuUI.resetButton.x + menuUI.resetButton.width &&
        mouseY >= menuUI.resetButton.y &&
        mouseY <= menuUI.resetButton.y + menuUI.resetButton.height
      ) {
        if (gameState) {
          gameState.projectilesHit = 0;
          gameState.projectilesMissed = 0;
          gameState.accuracy = 0;
        }
        if (gameStateFromLS) {
          gameStateFromLS.projectilesHit = 0;
          gameStateFromLS.projectilesMissed = 0;
          gameStateFromLS.accuracy = 0;
        }
        menuUI.draw();
        return;
      }
    }
  }
});
