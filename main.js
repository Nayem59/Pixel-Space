import { c, canvas } from "./utils/canvas.js";
import Player from "./classes/Player.js";
import Projectile from "./classes/Projectile.js";
import Enemy from "./classes/Enemy.js";
import Particle from "./classes/Particle.js";
import Turret from "./classes/Turret.js";
import {
  handlePlayerRotation,
  handlePlayerVelocity,
  handleShipExFireAnimation,
  handleTrail,
} from "./utils/input.js";
import Sprite from "./utils/sprite.js";
import { assets } from "./utils/assets.js";
import Vector2 from "./classes/Vector2.js";

const scoreEl = document.querySelector("#score");
const startGameBtn = document.querySelector("#startGame");
const modal = document.querySelector(".modal-container");
const endScore = document.querySelector("#endScore");

export const friction = 0.98;

// Instantiate a Player
const x = canvas.width / 2;
const y = canvas.height / 2;
export let player;
export let turret;
export let shipExFire;
let turretAngle = 0;
let mouseX = 0;
let mouseY = 0;

// array for storing projectiles
let projectiles = [];
// array for storing enemies
let enemies = [];
// array for storing particles
let particles = [];
// array for storing trails
export let trails = [];

function init() {
  player = new Player(x, y, 10, "blue", { x: 0, y: 0 });
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
  projectiles = [];
  enemies = [];
  particles = [];
  trails = [];
  score = 0;
  scoreEl.innerHTML = score;
  endScore.innerHTML = score;
}

// create enemies every 1 second and push to array
let enemyInterval;
function spawnEnemies() {
  enemyInterval = setInterval(() => {
    // any radius between 4 -> 30
    const radius = Math.random() * (30 - 5) + 5;

    // spawn off the screen randomly
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    const color = `hsl(${Math.random() * 360},50%,50%)`;

    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}

// create a custom function to start a animation loop
let animationId;
let score = 0;
let delta = 0;
let oldTimeStamp = 0;

function animate(timeStamp) {
  animationId = requestAnimationFrame(animate);
  // Calculate delta aka how many seconds has passed (milliseconds)
  delta = (timeStamp - oldTimeStamp) / 10;
  // delta = 1;
  oldTimeStamp = timeStamp;
  delta = Math.min(delta, 10);

  // clear canvas at each frame so it doesnt leave any trailers
  c.fillStyle = "#1D267D";
  c.fillRect(0, 0, canvas.width, canvas.height);

  handlePlayerVelocity();
  handlePlayerRotation();
  handleShipExFireAnimation(delta);

  handleTrail(delta);
  trails.forEach((trail, trailIndex) => {
    if (trail.alpha <= 0) {
      trails.splice(trailIndex, 1);
    } else {
      trail.update();
    }
  });
  // call the update method to show the player on screen and handle movement
  player.update(delta);

  // update turret and draw
  turretAngle = Math.atan2(mouseY - player?.y, mouseX - player?.x);
  turret.x = player.x;
  turret.y = player.y;
  turret.angle = turretAngle;
  turret.updateAnimation(delta);
  turret.draw();

  // prevent player from going beyond the canvas
  if (player.x - player.radius < 0) {
    player.x = player.radius;
  }
  if (player.x + player.radius > canvas.width) {
    player.x = canvas.width - player.radius;
  }
  if (player.y - player.radius < 0) {
    player.y = player.radius;
  }
  if (player.y + player.radius > canvas.height) {
    player.y = canvas.height - player.radius;
  }

  // starts the particle animation effect
  particles.forEach((particle, partIndex) => {
    if (particle.alpha <= 0) {
      particles.splice(partIndex, 1);
    } else {
      particle.update(delta);
    }
  });

  // starts the projetile animation effect
  projectiles.forEach((projectile, projIndex) => {
    projectile.update(delta);

    const distProj = Math.hypot(
      projectile.originalX - projectile.x,
      projectile.originalY - projectile.y
    );

    if (distProj > 300) {
      setTimeout(() => {
        projectiles.splice(projIndex, 1);
      }, 0);
    }

    // remove projectile from edge of screen to avoid memory usage
    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(projIndex, 1);
      }, 0);
    }
  });

  enemies.forEach((enemy, enemyIndex) => {
    enemy.update(delta);

    // remove enemy from edge of screen to avoid memory usage
    if (
      enemy.x + enemy.radius < 0 ||
      enemy.x - enemy.radius > canvas.width ||
      enemy.y + enemy.radius < 0 ||
      enemy.y - enemy.radius > canvas.height
    ) {
      setTimeout(() => {
        enemies.splice(enemyIndex, 1);
      }, 0);
    }

    // work out the distance between the player and enemy
    const distPlEn = Math.hypot(player.x - enemy.x, player.y - enemy.y);

    // end game if the enemy colides with player
    if (distPlEn - enemy.radius - player.radius < -2) {
      cancelAnimationFrame(animationId);
      clearInterval(enemyInterval);
      endScore.innerHTML = score;
      modal.style.display = "flex";
    }

    projectiles.forEach((projectile, projectileIndex) => {
      // work out the distance between the enemy and projectile
      const distEnPro = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      );

      // remove both if they touch, considering the radius
      if (distEnPro - enemy.radius - projectile.radius < -2) {
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 5),
                y: (Math.random() - 0.5) * (Math.random() * 5),
              }
            )
          );
        }

        // setTimout waits for next frame to remove enemy from array to avoid flasing bug
        if (enemy.radius - 10 > 5) {
          // increase score when touched
          score += 100;
          scoreEl.innerHTML = score;

          // using gsap animation library to make a transition smother for enemy.radius -= 10
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          score += 250;
          scoreEl.innerHTML = score;

          setTimeout(() => {
            enemies.splice(enemyIndex, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });
  });
}

// add click eventlistener for projectile
addEventListener("click", (e) => {
  turret?.startAnimation();

  // calculate the triangele angle (in radiant) between the center (Player) to the clicked point
  const angle = Math.atan2(e.clientY - player?.y, e.clientX - player?.x);
  // calculate velocity through sin and cos
  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };
  // Instantiate a Projectile and push it to the array
  projectiles.push(
    new Projectile(
      // adding velocity to create projectile distance from player
      player?.x + velocity.x * 4,
      player?.y + velocity.y * 4,
      5,
      "white",
      velocity,
      angle
    )
  );
});

canvas.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

startGameBtn.addEventListener("click", (e) => {
  init();
  animate(0);
  spawnEnemies();
  modal.style.display = "none";
});
