// Initializing Canvas
const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

const ship = new Image();
ship.src = "/assets/Ship_1.png";
let shipReady = false;
ship.onload = (e) => (shipReady = true);

const scoreEl = document.querySelector("#score");
const startGameBtn = document.querySelector("#startGame");
const modal = document.querySelector(".modal-container");
const endScore = document.querySelector("#endScore");

// Initializing 2D Context (bit like magic pen to draw inside the canvas)
const c = canvas.getContext("2d");

// Create main Player Class
class Player {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.speed = 0.2;
    this.maxVelocity = 3;
    this.rotation = 0;
    this.degree = 0;
  }

  // create a custom draw method that initiates a circul and fills it
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();

    // saving state of context and handle draw & rotation of image
    c.save();
    c.translate(this.x, this.y);
    c.rotate((this.degree * Math.PI) / 180);
    c.translate(-this.x, -this.y);
    if (shipReady) {
      c.drawImage(ship, this.x - 16, this.y - 17);
    }
    c.restore();
  }

  // update the coordinates to create the animation effect
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.degree += this.rotation;
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
    // restoring the previously saved context state
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
let player;

// array for storing projectiles
let projectiles = [];
// array for storing enemies
let enemies = [];
// array for storing particles
let particles = [];

function init() {
  player = new Player(x, y, 30, "blue", { x: 0, y: 0 });
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

  handlePlayerVelocity();
  handlePlayerRotation();

  // call the update method to show the player on screen and handle movement
  player.update();

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
  const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x);
  // calculate velocity through sin and cos
  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };
  // Instantiate a Projectile and push it to the array
  projectiles.push(new Projectile(player.x, player.y, 5, "red", velocity));
});

// Object to keep track of pressed keys
const keysPressed = {};

// Add or remove keys to the object on keydown and keyup events
addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
});

addEventListener("keyup", (e) => {
  delete keysPressed[e.key];
});

// Function to handle player velocity based on pressed keys
function handlePlayerVelocity() {
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

function handlePlayerRotation() {
  if (player.degree > 359) {
    player.degree = 0;
  }

  player.rotation = 0;

  if (keysPressed["w"] && player.degree !== 0) {
    player.degree <= 180 ? (player.rotation = -5) : (player.rotation = 5);
  }
  if (keysPressed["s"] && player.degree !== 180) {
    player.degree < 180 ? (player.rotation = 5) : (player.rotation = -5);
  }
  if (keysPressed["a"] && player.degree !== 270) {
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
  if (keysPressed["d"] && player.degree !== 90) {
    if (player.degree > 270 || player.degree < 90) {
      player.rotation = 5;
    } else if (player.degree < 270 || player.degree > 90) {
      player.rotation = -5;
    }
  }

  // handle diagnal rotation
  // if (keysPressed["w"] && keysPressed["d"]) {
  //   player.rotation = 45;
  // }
  // if (keysPressed["w"] && keysPressed["a"]) {
  //   player.rotation = -45;
  // }
  // if (keysPressed["s"] && keysPressed["a"]) {
  //   player.rotation = -135;
  // }
  // if (keysPressed["s"] && keysPressed["d"]) {
  //   player.rotation = 135;
  // }
}

startGameBtn.addEventListener("click", (e) => {
  init();
  animate();
  // spawnEnemies();
  modal.style.display = "none";
});
