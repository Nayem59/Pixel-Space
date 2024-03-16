// Initializing Canvas
const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.querySelector("#score");
const startGameBtn = document.querySelector("#startGame");
const modal = document.querySelector(".modal-container");
const endScore = document.querySelector("#endScore");

// Initializing 2D Context (bit like magic pen to draw inside the canvas)
const c = canvas.getContext("2d");

// Create main Player Class
class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  // create a custom draw method that initiates a circul and fills it
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

// Create Projectile Class
class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  // create a custom draw method that initiates a circul and fills it
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  // update the coordinates to create the animation effect
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

// Create Enemy Class
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  // create a custom draw method that initiates a circul and fills it
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  // update the coordinates to create the animation effect
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

// Create Particle Class
const friction = 0.98;
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  // create a custom draw method that initiates a circul and fills it
  draw() {
    // store the current drawing context state
    c.save();
    // setting global Alpha
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    // restoring the preveously saved context state
    c.restore();
  }

  // update the coordinates to create the animation effect
  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    // make alpha reduce on every frame update
    this.alpha -= 0.01;
  }
}

// Instantiate a Player
const x = canvas.width / 2;
const y = canvas.height / 2;
let player = new Player(x, y, 30, "blue");

// array for storing projectiles
let projectiles = [];
// array for storing enemies
let enemies = [];
// array for storing particles
let particles = [];

function init() {
  player = new Player(x, y, 30, "blue");
  projectiles = [];
  enemies = [];
  particles = [];
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

function animate() {
  animationId = requestAnimationFrame(animate);
  // clear canvas at each frame so it doesnt leave any trailers
  c.fillStyle = "#DCDCDC";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // call the draw method to show the player on screen
  player.draw();

  // starts the particle animation effect
  particles.forEach((particle, partIndex) => {
    if (particle.alpha <= 0) {
      particles.splice(partIndex, 1);
    } else {
      particle.update();
    }
  });

  // starts the projetile animation effect
  projectiles.forEach((projectile, projIndex) => {
    projectile.update();

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
    enemy.update();

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
  // calculate the triangele angle (in radiant) between the center (Player) to the clicked point
  const angle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );
  // calculate velocity through sin and cos
  const velocity = {
    x: Math.cos(angle) * 3,
    y: Math.sin(angle) * 3,
  };
  // Instantiate a Projectile and push it to the array
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "red", velocity)
  );
});

startGameBtn.addEventListener("click", (e) => {
  init();
  animate();
  spawnEnemies();
  modal.style.display = "none";
});
