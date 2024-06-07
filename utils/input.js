import { friction, player, shipExFire } from "../main.js";

// Object to keep track of pressed keys
export const keysPressed = {};

const rotationSpeed = 3;
const rotationThreshold = 5;

// Add or remove keys to the object on keydown and keyup events
addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
});

addEventListener("keyup", (e) => {
  delete keysPressed[e.key];
});

// Function to handle player velocity based on pressed keys
export function handlePlayerVelocity() {
  // Apply Friction to slow down gradually on keyup
  player.velocity.x *= friction;
  player.velocity.y *= friction;

  // Continuously add speed to velocity & handle rotation
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

export function handleShipExFireAnimation() {
  if (Object.keys(keysPressed).length === 0) {
    if (shipExFire.frame < 3) {
      shipExFire.frame++;
    } else {
      shipExFire.frame = 0;
    }
  } else {
    if (shipExFire.frame > 6 || shipExFire < 4) {
      shipExFire.frame = 4;
    } else {
      shipExFire.frame++;
    }
  }
}
