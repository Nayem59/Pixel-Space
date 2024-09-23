import { c, canvas } from "./utils/canvas.js";
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
} from "./utils/inputs.js";
import Sprite from "./classes/Sprite.js";
import { assets } from "./utils/assets.js";
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
} from "./utils/utils.js";

export const scoreEl = document.querySelector("#score");
const startGameBtn = document.querySelector("#startGame");
const modal = document.querySelector(".modal-container");
export const endScore = document.querySelector("#endScore");
export const collectableContainer = document.querySelector(
  ".collectable-container"
);
export const scoreContainer = document.querySelector(".score-container");
export const coinEl = document.querySelector("#coin");
export const gemEl = document.querySelector("#gem");
export const pauseEl = document.querySelector("#pause");

export const friction = 0.98;

// Instantiation
export const canvasMidX = canvas.width / 2;
export const canvasMidY = canvas.height / 2;
export let gameState;
export let storeState;
export let player;
export let turret;
export let shipExFire;
let turretAngle = 0;

export let tileMap;
export let map;
export let camera;
let miniMap;

let live;
let coinUI;
let gemUI;
let text;
export let stationUI;
export let coins = [];
let coinsEffects = [];
let gemsEffects = [];
export let gems = [];
let yellowPlanet;
export let spaceStation1;

export let projectiles = [];
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
  miniMap = new MiniMap(canvas.width, canvas.height);
  live = new HealthBar(5, 25, {
    asset: assets.images.live,
    frameSize: new Vector2(176, 44),
    hFrames: 8,
    vFrames: 3,
    frame: 0,
  });
  coinUI = new CoinUI(canvas.width - 170, 3, {
    asset: assets.images.coinUI,
    frameSize: new Vector2(48, 48),
    hFrames: 1,
    vFrames: 1,
    frame: 0,
  });
  gemUI = new GemUI(canvas.width - 170, 60, {
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
  projectiles = [];
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
}

// main game loop
let animationId;
let delta = 0;
let oldTimeStamp = 0;

function gameLoop(timeStamp) {
  animationId = requestAnimationFrame(gameLoop);

  if (gameState.isPaused) {
    return;
  }

  if (gameState.openStation) {
    stationUI.draw();
    return;
  }

  // Calculate delta aka how many seconds has passed (milliseconds)
  delta = (timeStamp - oldTimeStamp) / 10;
  // delta = 1;
  oldTimeStamp = timeStamp;
  delta = Math.min(delta, 10);

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

    const distProj = Math.hypot(
      projectile.originalX - projectile.x,
      projectile.originalY - projectile.y
    );

    if (distProj > 300) {
      projectiles.splice(projIndex, 1);
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
      explosions.push(new Explosion(missile.x, missile.y, 30));
      missiles.splice(missileIndex, 1);
    }
  });

  const currentTime = Date.now();
  const enemiesToRemove = [];
  // enemy update and handle all collisions with enemy
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update(delta);

    const distPlEn = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    // reduce hp if the enemy collides with player, end game if hp is 0
    if (distPlEn - enemy.radius - player.radius < -2) {
      gameState.takeDamage(1);
      live.startAnimation();
      camera.damageDuration = 10;

      resolveCollision(player, enemy);

      enemiesToRemove.push(enemyIndex);

      if (gameState.playerHealth === 0) {
        setTimeout(() => {
          cancelAnimationFrame(animationId);
          clearTimeout(enemyTimeOutId);
          modal.style.display = "flex";
        }, 300);
      }
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const distEnPro = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      );

      if (distEnPro - enemy.radius - projectile.radius < -2) {
        texts.push(new Text(enemy.x, enemy.y, player.damage * -1));
        enemy.health -= player.damage;
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

        if (enemy.health > 0) {
          gameState.score += 100;
          resolveCollision(projectile, enemy);
          enemy.hit = true;
          enemy.startAnimation();
          projectiles.splice(projectileIndex, 1);
        } else {
          gameState.score += 250;
          enemiesToRemove.push(enemyIndex);

          Math.random() < 0.1 ? dropGem(enemy) : dropCoins(enemy);

          projectiles.splice(projectileIndex, 1);
        }
      }
    });

    missiles.forEach((missile, missileIndex) => {
      const distEnMissile = Math.hypot(
        missile.x - enemy.x,
        missile.y - enemy.y
      );

      if (distEnMissile - enemy.radius - missile.radius < -2) {
        explosions.push(new Explosion(enemy.x, enemy.y, 30));
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
          texts.push(
            new Text(
              enemy.x,
              enemy.y,
              player.damage * explosion.damageMultiplier * -1
            )
          );
          enemy.takeDamage(
            player.damage * explosion.damageMultiplier,
            currentTime
          );
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
            gameState.score += 250;
            enemiesToRemove.push(enemyIndex);
            Math.random() < 0.1 ? dropGem(enemy) : dropCoins(enemy);
          }
        }
      }
    });
  });
  enemiesToRemove
    .sort((a, b) => b - a)
    .forEach((index) => {
      if (gameState.lastMarkedEnemy === enemies[index]) {
        gameState.lastMarkedEnemy = null;
      }
      enemies.splice(index, 1);
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
    if (explosion.alpha <= 0) {
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
    coin.isAnimating = true;
    coin.update(delta);
    const distCoinPlayer = Math.hypot(player.x - coin.x, player.y - coin.y);
    if (distCoinPlayer - player.radius - coin.radius < -2) {
      const coinEffect = coin.createCollectionEffect();
      coinEffect.isAnimating = true;
      coinsEffects.push(coinEffect);
      coins.splice(coinIndex, 1);
      gameState.coins++;
    }
  });
  gems.forEach((gem, gemIndex) => {
    gem.isAnimating = true;
    gem.update(delta);
    const distGemPlayer = Math.hypot(player.x - gem.x, player.y - gem.y);
    if (distGemPlayer - player.radius - gem.radius < -2) {
      const gemEffect = gem.createCollectionEffect();
      gemEffect.isAnimating = true;
      gemsEffects.push(gemEffect);
      gems.splice(gemIndex, 1);
      gameState.gems++;
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
}

startGameBtn.addEventListener("click", (e) => {
  init();
  gameLoop(0);
  spawnEnemies();
  spawnEnemies();
  modal.style.display = "none";
  collectableContainer.style.display = "block";
  scoreContainer.style.display = "block";
});
