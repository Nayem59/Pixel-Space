// Initializing Canvas
const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

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

// Instantiate a Player
const x = canvas.width / 2;
const y = canvas.height / 2;
const player = new Player(x, y, 30, "blue");

// array for storing projectiles
const projectiles = [];
// array for storing enemies
const enemies = [];

// create enemies every 1 second and push to array
function spawnEnemies() {
  setInterval(() => {
    const radius = 30;
    // spawn off the screen randomly
    const x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
    const y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    const color = "green";

    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}

// create a custom function to start a animation loop
function animate() {
  requestAnimationFrame(animate);
  // clear canvas at each frame so it doesnt leave any trailers
  c.clearRect(0, 0, canvas.width, canvas.height);

  // call the draw method to show the player on screen
  player.draw();

  projectiles.forEach((projectile) => {
    projectile.update();
  });

  enemies.forEach((enemy) => {
    enemy.update();
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
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  // Instantiate a Projectile and push it to the array
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "red", velocity)
  );
});

// staring to animate
// animate();

// spawnEnemies();
