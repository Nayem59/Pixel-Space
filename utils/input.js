import { friction, player } from "../main.js";

// Object to keep track of pressed keys
export const keysPressed = {};

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

export function handlePlayerRotation() {
  if (player.degree > 359) {
    player.degree = 0;
  }

  player.rotation = 0;

  if (
    keysPressed["w"] &&
    !keysPressed["a"] &&
    !keysPressed["d"] &&
    !keysPressed["s"] &&
    player.degree !== 0
  ) {
    player.degree <= 180 ? (player.rotation = -5) : (player.rotation = 5);
  }
  if (
    keysPressed["s"] &&
    !keysPressed["a"] &&
    !keysPressed["d"] &&
    !keysPressed["w"] &&
    player.degree !== 180
  ) {
    player.degree < 180 ? (player.rotation = 5) : (player.rotation = -5);
  }
  if (
    keysPressed["a"] &&
    !keysPressed["w"] &&
    !keysPressed["s"] &&
    !keysPressed["d"] &&
    player.degree !== 270
  ) {
    if (player.degree > 270) {
      player.rotation = -5;
    } else if (player.degree < 90 && player.degree > 0) {
      player.rotation = -5;
    } else if (player.degree <= 0) {
      player.rotation = 360 - 5;
    } else if (player.degree < 270 || player.degree > 90) {
      player.rotation = 5;
    }
  }
  if (
    keysPressed["d"] &&
    !keysPressed["w"] &&
    !keysPressed["s"] &&
    !keysPressed["a"] &&
    player.degree !== 90
  ) {
    if (player.degree > 270 || player.degree < 90) {
      player.rotation = 5;
    } else if (player.degree < 270 || player.degree > 90) {
      player.rotation = -5;
    }
  }

  // handle diagnal rotation
  if (keysPressed["w"] && keysPressed["d"] && player.degree !== 45) {
    if (player.degree < 45 || player.degree > 225) {
      player.rotation = 5;
    } else {
      player.rotation = -5;
    }
  }
  if (keysPressed["w"] && keysPressed["a"] && player.degree !== 315) {
    if (player.degree < 315 && player.degree > 135) {
      player.rotation = 5;
    } else if (player.degree <= 0) {
      player.rotation = 360 - 5;
    } else {
      player.rotation = -5;
    }
  }
  if (keysPressed["s"] && keysPressed["a"] && player.degree !== 225) {
    if (player.degree < 225 && player.degree > 45) {
      player.rotation = 5;
    } else if (player.degree <= 0) {
      player.rotation = 360 - 5;
    } else {
      player.rotation = -5;
    }
  }
  if (keysPressed["s"] && keysPressed["d"] && player.degree !== 135) {
    if (player.degree < 135 || player.degree > 315) {
      player.rotation = 5;
    } else {
      player.rotation = -5;
    }
  }
}
