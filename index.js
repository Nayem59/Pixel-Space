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
}

// Instantiate a Player
const x = canvas.width / 2;
const y = canvas.height / 2;
const player = new Player(x, y, 30, "blue");

// call the draw method to show the player on screen
player.draw();

// add click eventlistener for projectile
addEventListener("click", (e) => {
  const projectile = new Projectile(e.clientX, e.clientY, 5, "red", null);
  projectile.draw();
});
