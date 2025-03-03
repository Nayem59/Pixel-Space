import HomingMissile from "../classes/HomingMissile.js";
import Projectile from "../classes/Projectile.js";
import Trail from "../classes/Trail.js";
import Vector2 from "../classes/Vector2.js";
import {
  camera,
  enemies,
  friction,
  gameState,
  lasers,
  menuState,
  menuUI,
  missiles,
  player,
  projectiles,
  shipExFire,
  skillUI,
  spaceStation1,
  stationUI,
  storeState,
  trails,
  turret,
} from "../main.js";
import { assets } from "./assets.js";
import { canvas, menuCanvas } from "./canvas.js";
import { sounds } from "./sounds.js";

let keysPressed = {};
const engineKeys = new Set(["w", "a", "s", "d"]);
addEventListener("keydown", (e) => {
  if (menuState.menuOpen) {
    return;
  }
  if (e.key === "Escape") {
    gameState.isPaused = !gameState.isPaused;
    sounds.stopAllSounds();
    if (gameState.isPaused) {
      keysPressed = {};
      toggleMenu(true);
      menuUI.frame = 2;

      menuUI.draw();
      return;
    } else {
      toggleMenu(false);
      return;
    }
  }
  if (e.key === " ") {
    if (storeState.boostCount > 0) {
      handleBoost();
    }
  }
  keysPressed[e.key.toLowerCase()] = true;

  // Start engine sound if any engine key is pressed
  if (engineKeys.has(e.key.toLowerCase())) {
    sounds.loopSound("engine1");
  }
});
addEventListener("keyup", (e) => {
  if (menuState.menuOpen) {
    return;
  }
  if (e.key === "q") {
    if (storeState.potionCount > 0) {
      if (gameState.playerHealth < gameState.maxHealth) {
        gameState.playerHealth++;
        gameState.potionUsed++;
        storeState.potionCount--;
      } else {
        // handle health already max
      }
    }
  }
  if (e.key === "e") {
    if (storeState.missileCount > 0) {
      shootHomingMissile();
      storeState.missileCount--;
      gameState.missilesLaunched++;
    }
  }
  if (e.key === "f") {
    if (storeState.shieldCount > 0) {
      activateShield();
    }
  }
  if (e.key === "r") {
    if (storeState.cloakCount > 0) {
      activateCloaking();
    }
  }
  delete keysPressed[e.key.toLowerCase()];
  stopEngineSound();
});

export function stopEngineSound() {
  // Stop engine sound if no engine keys are pressed
  if (!Object.keys(keysPressed).some((key) => engineKeys.has(key))) {
    sounds.stopSound("engine1");
  }
}

let shootInterval = null;
canvas.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    let newMarkedEnemy = null;
    for (let enemy of enemies) {
      if (enemy.isMouseOverEnemy(e)) {
        newMarkedEnemy = enemy;
      }
    }

    if (newMarkedEnemy) {
      if (gameState.lastMarkedEnemy) {
        gameState.lastMarkedEnemy.isMarked = false;
      }
      newMarkedEnemy.isMarked = true;
      gameState.lastMarkedEnemy = newMarkedEnemy;
    }

    if (spaceStation1?.playerDetection()) {
      if (spaceStation1.mouseDetection(e)) {
        gameState.openStation = true;
        sounds.stopAllSounds();
      }
    }
    if (!gameState?.isPaused && !gameState.openStation) {
      player.isShooting = true;
      player.cloakActive = false;
      skillUI.cloakOnCooldown = true;
      skillUI.cloakRemainingTime =
        skillUI.cloakRemainingTime > skillUI.cloakCooldownTime
          ? skillUI.cloakCooldownTime
          : skillUI.cloakRemainingTime;
      if (storeState.hasContinuousFire) {
        shootProjectile(mouseX, mouseY);
        shootInterval = setInterval(() => {
          if (player.isShooting) {
            shootProjectile(mouseX, mouseY);
          }
        }, 100);
      } else {
        shootProjectile(mouseX, mouseY);
      }
    }
  } else if (e.button === 2) {
    if (storeState.hasLaser) {
      if (gameState.lastMarkedEnemy) {
        lasers[0].active = true;
      }
    }
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (e.button === 0) {
    player.isShooting = false;
    clearInterval(shootInterval);

    if (gameState?.openStation) {
      // Check if the click is inside the "X" button area
      if (
        mouseX >= stationUI.xButton.x &&
        mouseX <= stationUI.xButton.x + stationUI.xButton.width &&
        mouseY >= stationUI.xButton.y &&
        mouseY <= stationUI.xButton.y + stationUI.xButton.height
      ) {
        setTimeout(() => {
          gameState.openStation = false;
        }, 0);
        sounds.resumePausedSounds();
      }

      if (
        mouseX >= stationUI.upgradeTab.x &&
        mouseX <= stationUI.upgradeTab.x + stationUI.upgradeTab.width &&
        mouseY >= stationUI.upgradeTab.y &&
        mouseY <= stationUI.upgradeTab.y + stationUI.upgradeTab.height
      ) {
        stationUI.currentTab = "upgrade";
        stationUI.frame = 0;
      }

      if (
        mouseX >= stationUI.shopTab.x &&
        mouseX <= stationUI.shopTab.x + stationUI.shopTab.width &&
        mouseY >= stationUI.shopTab.y &&
        mouseY <= stationUI.shopTab.y + stationUI.shopTab.height
      ) {
        stationUI.currentTab = "shop";
        stationUI.frame = 1;
      }

      if (stationUI.currentTab === "upgrade") {
        if (
          mouseX >= stationUI.healthPlusButton.x &&
          mouseX <=
            stationUI.healthPlusButton.x + stationUI.healthPlusButton.width &&
          mouseY >= stationUI.healthPlusButton.y &&
          mouseY <=
            stationUI.healthPlusButton.y + stationUI.healthPlusButton.height
        ) {
          storeState.increaseHealth()
            ? stationUI.healthUpgrade.frame++
            : console.log("cant upgrade");
        }

        if (
          mouseX >= stationUI.damagePlusButton.x &&
          mouseX <=
            stationUI.damagePlusButton.x + stationUI.damagePlusButton.width &&
          mouseY >= stationUI.damagePlusButton.y &&
          mouseY <=
            stationUI.damagePlusButton.y + stationUI.damagePlusButton.height
        ) {
          storeState.increaseDamage()
            ? stationUI.damageUpgrade.frame++
            : console.log("cant upgrade");
        }

        if (
          mouseX >= stationUI.speedPlusButton.x &&
          mouseX <=
            stationUI.speedPlusButton.x + stationUI.speedPlusButton.width &&
          mouseY >= stationUI.speedPlusButton.y &&
          mouseY <=
            stationUI.speedPlusButton.y + stationUI.speedPlusButton.height
        ) {
          storeState.increaseSpeed()
            ? stationUI.speedUpgrade.frame++
            : console.log("cant upgrade");
        }
      }

      if (stationUI.currentTab === "shop") {
        if (
          mouseX >= stationUI.healthPotionItem.x &&
          mouseX <=
            stationUI.healthPotionItem.x + stationUI.healthPotionItem.width &&
          mouseY >= stationUI.healthPotionItem.y &&
          mouseY <=
            stationUI.healthPotionItem.y + stationUI.healthPotionItem.height
        ) {
          storeState.buyPotions(1);
        }
        if (
          mouseX >= stationUI.homingMissileItem.x &&
          mouseX <=
            stationUI.homingMissileItem.x + stationUI.homingMissileItem.width &&
          mouseY >= stationUI.homingMissileItem.y &&
          mouseY <=
            stationUI.homingMissileItem.y + stationUI.homingMissileItem.height
        ) {
          storeState.buyMissiles(1);
        }
        if (
          mouseX >= stationUI.speedBoostItem.x &&
          mouseX <=
            stationUI.speedBoostItem.x + stationUI.speedBoostItem.width &&
          mouseY >= stationUI.speedBoostItem.y &&
          mouseY <= stationUI.speedBoostItem.y + stationUI.speedBoostItem.height
        ) {
          storeState.buyBoost(1);
        }
        if (
          mouseX >= stationUI.bubbleShieldItem.x &&
          mouseX <=
            stationUI.bubbleShieldItem.x + stationUI.bubbleShieldItem.width &&
          mouseY >= stationUI.bubbleShieldItem.y &&
          mouseY <=
            stationUI.bubbleShieldItem.y + stationUI.bubbleShieldItem.height
        ) {
          storeState.buyShields(1);
        }
        if (
          mouseX >= stationUI.cloakingDeviceItem.x &&
          mouseX <=
            stationUI.cloakingDeviceItem.x +
              stationUI.cloakingDeviceItem.width &&
          mouseY >= stationUI.cloakingDeviceItem.y &&
          mouseY <=
            stationUI.cloakingDeviceItem.y + stationUI.cloakingDeviceItem.height
        ) {
          storeState.buyCloak(1);
        }
        if (
          mouseX >= stationUI.autoTurretUpgrade.x &&
          mouseX <=
            stationUI.autoTurretUpgrade.x + stationUI.autoTurretUpgrade.width &&
          mouseY >= stationUI.autoTurretUpgrade.y &&
          mouseY <=
            stationUI.autoTurretUpgrade.y + stationUI.autoTurretUpgrade.height
        ) {
          storeState.upgradeToAutoTurret();
        }
        if (
          mouseX >= stationUI.twinTurretUpgrade.x &&
          mouseX <=
            stationUI.twinTurretUpgrade.x + stationUI.twinTurretUpgrade.width &&
          mouseY >= stationUI.twinTurretUpgrade.y &&
          mouseY <=
            stationUI.twinTurretUpgrade.y + stationUI.twinTurretUpgrade.height
        ) {
          storeState.upgradeToTwinTurret();
        }
        if (
          mouseX >= stationUI.laserGunUpgrade.x &&
          mouseX <=
            stationUI.laserGunUpgrade.x + stationUI.laserGunUpgrade.width &&
          mouseY >= stationUI.laserGunUpgrade.y &&
          mouseY <=
            stationUI.laserGunUpgrade.y + stationUI.laserGunUpgrade.height
        ) {
          storeState.upgradeToLaserGun();
        }
        if (
          mouseX >= stationUI.coinBuyButton.x &&
          mouseX <= stationUI.coinBuyButton.x + stationUI.coinBuyButton.width &&
          mouseY >= stationUI.coinBuyButton.y &&
          mouseY <= stationUI.coinBuyButton.y + stationUI.coinBuyButton.height
        ) {
          storeState.buyCoins();
        }
        if (
          mouseX >= stationUI.gemBuyButton.x &&
          mouseX <= stationUI.gemBuyButton.x + stationUI.gemBuyButton.width &&
          mouseY >= stationUI.gemBuyButton.y &&
          mouseY <= stationUI.gemBuyButton.y + stationUI.gemBuyButton.height
        ) {
          storeState.buyGems();
        }
      }
    }
  } else if (e.button === 2) {
    if (storeState.hasLaser) {
      lasers[0].active = false;
    }
  }
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

menuCanvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

export let mouseX = 0;
export let mouseY = 0;
addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

export function toggleMenu(show) {
  menuCanvas.style.display = show ? "block" : "none";
  menuState.menuOpen = show;
}

let boostActive = false;
let boostCooldown = false;
const boostDuration = 300; // in milliseconds
const boostCooldownTime = 1000; // 1 second cooldown after boost
function handleBoost() {
  if (boostActive || boostCooldown) return; // Ignore if already boosting or cooling down

  boostActive = true;
  sounds.playSound("boost");

  storeState.boostCount--;
  gameState.boostUsed++;
  const angle = ((player.degree - 90) * Math.PI) / 180;

  // Set initial boost velocity
  const boostSpeed = 30;
  const originalMaxVelocity = player.maxVelocity;
  player.maxVelocity = player.maxVelocity * 3;
  player.velocity = {
    x: Math.cos(angle) * boostSpeed,
    y: Math.sin(angle) * boostSpeed,
  };

  // Start the cooldown in the UI
  skillUI.startBoostCooldown();

  // Boost duration
  setTimeout(() => {
    boostActive = false; // End boost
    boostCooldown = true; // Start cooldown
    player.maxVelocity = originalMaxVelocity; // Reset to normal speed
  }, boostDuration);

  // Cooldown after boost ends
  setTimeout(() => {
    boostCooldown = false; // End cooldown
  }, boostDuration + boostCooldownTime);
}

let shieldCooldown = false;
const shieldDuration = 5000;
const shieldCooldownTime = 10000;
function activateShield() {
  if (player.shieldActive || shieldCooldown) return;
  player.shieldActive = true;
  storeState.shieldCount--;
  gameState.shieldActivated++;

  skillUI.startShieldCooldown();

  setTimeout(() => {
    player.shieldActive = false;
    shieldCooldown = true;
  }, shieldDuration);

  setTimeout(() => {
    shieldCooldown = false;
  }, shieldDuration + shieldCooldownTime);
}

function activateCloaking() {
  if (player.cloakActive || skillUI.cloakOnCooldown) return;
  player.cloakActive = true;
  sounds.playSound("cloakSound");
  storeState.cloakCount--;
  gameState.cloakingUsed++;

  skillUI.startCloakCooldown();
}

// let audioContext = new AudioContext();
// let shootingBuffer;

// function loadSound(url) {
//   fetch(url)
//     .then((response) => response.arrayBuffer())
//     .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
//     .then((audioBuffer) => {
//       shootingBuffer = audioBuffer; // Save decoded buffer
//     })
//     .catch((e) => console.error("Error loading shoot sound:", e));
// }

// function playSound(buffer) {
//   const source = audioContext.createBufferSource();
//   source.buffer = buffer;
//   source.connect(audioContext.destination);
//   source.start(0); // Start playing immediately
// }

// // Load the sound at the beginning
// loadSound("assets/soundEffects/shooting-sound.mp3");

function shootProjectile(mouseX, mouseY) {
  turret?.startAnimation();

  // // Play the sound using the Web Audio API
  // if (shootingBuffer) {
  //   playSound(shootingBuffer);
  // }

  // projectileSound or projectileSound5 ??
  sounds.playSound("projectileSound5");

  // calculate the triangle angle (in radiant) between the center (Player) to the clicked point
  const angle = Math.atan2(
    mouseY + camera?.y - player?.y,
    mouseX + camera?.x - player?.x
  );
  // calculate velocity through sin and cos
  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };

  const offset = { x: 0, y: 0 };

  if (storeState.hasTwinTurret) {
    // Set the offset distance between the two projectiles
    const turretSpacing = 10; // Adjust this value for wider or narrower spacing
    // Calculate the perpendicular angle for the offset
    const perpendicularAngle = angle + Math.PI / 2;
    offset.x = Math.cos(perpendicularAngle) * turretSpacing;
    offset.y = Math.sin(perpendicularAngle) * turretSpacing;
    projectiles.push(
      new Projectile(
        player?.x + velocity.x * 5 - offset.x, // Offset left
        player?.y + velocity.y * 5 - offset.y,
        5,
        "white",
        velocity,
        angle
      )
    );
  }
  projectiles.push(
    new Projectile(
      player?.x + velocity.x * 5 + offset.x, // Offset right
      player?.y + velocity.y * 5 + offset.y,
      5,
      "white",
      velocity,
      angle
    )
  );
}

function shootHomingMissile() {
  turret?.startAnimation();

  // Convert player's degree to radians
  const angle = ((player.degree - 90) * Math.PI) / 180;

  // calculate velocity through sin and cos
  const velocity = {
    x: Math.cos(angle) * 3,
    y: Math.sin(angle) * 3,
  };

  // Instantiate a Missile and push it to the array
  missiles.push(
    new HomingMissile(
      // adding velocity to create projectile distance from player
      player?.x + velocity.x * 5,
      player?.y + velocity.y * 5,
      40,
      "white",
      velocity,
      angle,
      {
        asset: assets.images.missile,
        frameSize: new Vector2(32, 32),
        hFrames: 8,
        vFrames: 1,
        frame: 0,
      }
    )
  );
}

export function handlePlayerVelocity() {
  // Apply Friction to slow down gradually on keyup
  player.velocity.x *= friction;
  player.velocity.y *= friction;

  // Continuously add speed to velocity
  if (keysPressed["w"]) player.velocity.y -= player.speed;
  if (keysPressed["s"]) player.velocity.y += player.speed;
  if (keysPressed["a"]) player.velocity.x -= player.speed;
  if (keysPressed["d"]) player.velocity.x += player.speed;

  // Calculate velocity Magnitude through pythagoras theorem
  const velocityMagnitude = Math.sqrt(
    player.velocity.x ** 2 + player.velocity.y ** 2
  );

  // Handle if velocity is very small then set it to 0
  const minVelocityThreshold = 0.01;
  if (velocityMagnitude < minVelocityThreshold) {
    player.velocity.x = 0;
    player.velocity.y = 0;
  }

  // Limit the velocity to the maximum velocity
  if (velocityMagnitude > player.maxVelocity) {
    const scale = player.maxVelocity / velocityMagnitude;
    player.velocity.x *= scale;
    player.velocity.y *= scale;
  }
}

// Define key combinations and their target degrees
const keyRotationMap = {
  w: 0,
  s: 180,
  a: 270,
  d: 90,
  wd: 45,
  dw: 45,
  wa: 315,
  aw: 315,
  sa: 225,
  as: 225,
  sd: 135,
  ds: 135,
};

function getKeyCombination() {
  let combo = "";
  if (keysPressed["w"]) combo += "w";
  if (keysPressed["a"]) combo += "a";
  if (keysPressed["s"]) combo += "s";
  if (keysPressed["d"]) combo += "d";
  return combo;
}

const rotationSpeed = 3;
const rotationThreshold = 5;
export function handlePlayerRotation() {
  const combo = getKeyCombination();
  const targetDegree = keyRotationMap[combo];

  if (player.degree > 359) {
    player.degree = 0;
  }

  player.rotation = 0;
  if (targetDegree === undefined) return;

  // Calculate the shortest direction to rotate
  const diff = (targetDegree - player.degree + 360) % 360;

  // Check if the player is within the rotation threshold, this is due to the overshooting of rotation with delta and causes back and forth shake oscillation
  if (diff > rotationThreshold && diff < 360 - rotationThreshold) {
    if (diff <= 180) {
      player.rotation = rotationSpeed;
    } else {
      player.rotation = -rotationSpeed;
    }
  } else {
    player.degree = targetDegree; // Snap to target degree if within threshold
  }
}

const idleFrames = [0, 1, 2, 3];
const activeFrames = [4, 5, 6, 7];
const frameDuration = (1 / 30) * 100;
let frameTimer = 0;
export function handleShipExFireAnimation(delta) {
  // Increment the frame timer by delta time
  frameTimer += delta;

  // Check if it's time to update the frame
  while (frameTimer >= frameDuration) {
    frameTimer -= frameDuration; // Reset the timer by the frame duration

    if (
      keysPressed["w"] ||
      keysPressed["a"] ||
      keysPressed["s"] ||
      keysPressed["d"] ||
      boostActive
    ) {
      // Active animation
      if (shipExFire.frame < 4 || shipExFire.frame > 6) {
        shipExFire.frame = 4; // Ensure frame is within active range
      } else {
        shipExFire.frame =
          4 + ((shipExFire.frame - 4 + 1) % activeFrames.length);
      }
    } else {
      // Idle animation
      shipExFire.frame = (shipExFire.frame + 1) % idleFrames.length;
    }
  }
}

const trailFrameDuration = (1 / 60) * 100;
let trailFrameTimer = 0;
export function handleTrail(delta) {
  trailFrameTimer += delta;

  while (trailFrameTimer >= trailFrameDuration) {
    trailFrameTimer -= trailFrameDuration;
    if (boostActive) {
      trails.push(
        new Trail(
          player.x,
          player.y,
          "#7DF9FF",
          "blue",
          player.degree,
          boostActive
        )
      );
    } else if (
      keysPressed["w"] ||
      keysPressed["a"] ||
      keysPressed["s"] ||
      keysPressed["d"]
    ) {
      trails.push(
        new Trail(
          player.x,
          player.y,
          "orange",
          "red",
          player.degree,
          boostActive
        )
      );
    }
  }
}
