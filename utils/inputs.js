import HomingMissile from "../classes/HomingMissile.js";
import Projectile from "../classes/Projectile.js";
import Trail from "../classes/Trail.js";
import Vector2 from "../classes/Vector2.js";
import {
  camera,
  enemies,
  friction,
  gameState,
  missiles,
  player,
  projectiles,
  shipExFire,
  spaceStation1,
  stationUI,
  storeState,
  trails,
  turret,
} from "../main.js";
import { assets } from "./assets.js";
import { canvas } from "./canvas.js";

const keysPressed = {};
addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    gameState.isPaused = !gameState.isPaused;
  } else {
    keysPressed[e.key] = true;
  }
});
addEventListener("keyup", (e) => {
  if (e.key === " ") {
    if (storeState.missileCount > 0) {
      shootHomingMissile();
      storeState.missileCount--;
    }
  }
  delete keysPressed[e.key];
});

export let mouseX = 0;
export let mouseY = 0;
canvas.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let shootInterval = null;
canvas.addEventListener("mousedown", (e) => {
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
    }
  }
  if (!gameState?.isPaused && !gameState.openStation) {
    player.isShooting = true;
    if (storeState.hasContinuousLaser) {
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
});

canvas.addEventListener("mouseup", (e) => {
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
        mouseY <= stationUI.speedPlusButton.y + stationUI.speedPlusButton.height
      ) {
        storeState.increaseSpeed()
          ? stationUI.speedUpgrade.frame++
          : console.log("cant upgrade");
      }
    }
  }
});

function shootProjectile(mouseX, mouseY) {
  turret?.startAnimation();

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

  // Instantiate a Projectile and push it to the array
  projectiles.push(
    new Projectile(
      // adding velocity to create projectile distance from player
      player?.x + velocity.x * 5,
      player?.y + velocity.y * 5,
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

  // Calculate velocity Magnitute through pythagoras theorem
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
      keysPressed["d"]
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
    if (
      keysPressed["w"] ||
      keysPressed["a"] ||
      keysPressed["s"] ||
      keysPressed["d"]
    ) {
      trails.push(new Trail(player.x, player.y, "orange", player.degree));
    }
  }
}
