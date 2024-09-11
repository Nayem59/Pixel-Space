import Collectable from "../classes/Collectable.js";
import Enemy from "../classes/Enemy.js";
import Vector2 from "../classes/Vector2.js";
import { coins, enemies, gems, map } from "../main.js";
import { assets } from "./assets.js";

// complex algorithm to resolve collision, dont understand fully, research elastic collision
export function resolveCollision(circle1, circle2) {
  const dx = circle2.x - circle1.x;
  const dy = circle2.y - circle1.y;

  // Angle of the collision
  const collisionAngle = Math.atan2(dy, dx);

  // Speeds before collision
  const speed1 = Math.sqrt(
    circle1.velocity.x * circle1.velocity.x +
      circle1.velocity.y * circle1.velocity.y
  );
  const speed2 = Math.sqrt(
    circle2.velocity.x * circle2.velocity.x +
      circle2.velocity.y * circle2.velocity.y
  );

  // Directions before collision
  const direction1 = Math.atan2(circle1.velocity.y, circle1.velocity.x);
  const direction2 = Math.atan2(circle2.velocity.y, circle2.velocity.x);

  // New velocities
  const vx1 = speed1 * Math.cos(direction1 - collisionAngle);
  const vy1 = speed1 * Math.sin(direction1 - collisionAngle);
  const vx2 = speed2 * Math.cos(direction2 - collisionAngle);
  const vy2 = speed2 * Math.sin(direction2 - collisionAngle);

  // Conservation of momentum
  const finalVx1 =
    ((circle1.mass - circle2.mass) * vx1 +
      (circle2.mass + circle2.mass) * vx2) /
    (circle1.mass + circle2.mass);
  const finalVx2 =
    ((circle1.mass + circle1.mass) * vx1 +
      (circle2.mass - circle1.mass) * vx2) /
    (circle1.mass + circle2.mass);

  // Update velocities according to the angle
  circle1.velocity.x =
    Math.cos(collisionAngle) * finalVx1 +
    Math.cos(collisionAngle + Math.PI / 2) * vy1;
  circle1.velocity.y =
    Math.sin(collisionAngle) * finalVx1 +
    Math.sin(collisionAngle + Math.PI / 2) * vy1;
  circle2.velocity.x =
    Math.cos(collisionAngle) * finalVx2 +
    Math.cos(collisionAngle + Math.PI / 2) * vy2;
  circle2.velocity.y =
    Math.sin(collisionAngle) * finalVx2 +
    Math.sin(collisionAngle + Math.PI / 2) * vy2;
}

export let enemyTimeOutId;
export function spawnEnemies() {
  const randomTime = Math.floor(Math.random() * (60000 - 10000 + 1)) + 10000;
  const radius = 23;

  // debugging
  // let x = 500;
  // let y = 500;
  let x = Math.random() * map.tileWidth * map.tilesCountX;
  let y = Math.random() * map.tileHeight * map.tilesCountY;
  const color = "#ab47bc";

  enemies.push(
    new Enemy(
      x,
      y,
      radius,
      color,
      { x: 0, y: 0 },
      {
        asset: assets.images.purpleBlob,
        frameSize: new Vector2(64, 64),
        hFrames: 8,
        vFrames: 1,
        frame: 0,
      }
    )
  );

  if (enemies.length > 50) {
    const enemyIdx = enemies.findIndex((enemy) => !enemy.visible);
    enemies.splice(enemyIdx, 1);
  }

  enemyTimeOutId = setTimeout(spawnEnemies, randomTime);
}

export function dropCoins(enemy) {
  const randomCoins = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  for (let i = 1; i <= randomCoins; i++) {
    const randomLocX =
      (Math.random() < 0.5 ? -1 : 1) *
        Math.floor(Math.random() * (30 - 10 + 1)) +
      10;
    const randomLocY =
      (Math.random() < 0.5 ? -1 : 1) *
        Math.floor(Math.random() * (30 - 10 + 1)) +
      10;

    coins.push(
      new Collectable(enemy.x + randomLocX, enemy.y + randomLocY, 8, "coin", {
        asset: assets.images.coin,
        frameSize: new Vector2(16, 16),
        hFrames: 24,
        vFrames: 1,
        frame: Math.floor(Math.random() * (24 - 1 + 1)) + 1,
      })
    );
  }
}

export function dropGem(enemy) {
  gems.push(
    new Collectable(enemy.x, enemy.y, 8, "gem", {
      asset: assets.images.gem,
      frameSize: new Vector2(16, 16),
      hFrames: 15,
      vFrames: 1,
      frame: 0,
    })
  );
}
