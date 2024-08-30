import { assets } from "../utils/assets.js";
import { c } from "../utils/canvas.js";
import Sprite from "../utils/sprite.js";
import { camera, player, map, friction } from "../main.js";

class Enemy extends Sprite {
  constructor(x, y, radius, color, velocity, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.detectionRadius = 300;
    this.visible = false;
    this.hit = false;
    this.margin = 40;
    this.color = color;
    this.velocity = velocity;
    this.state = "idle";
    this.idleTime = 0;
    this.patrolPoints = this.generatePatrolPoints();
    this.currentPatrolPoint = 0;
    this.health = 2;
    this.speed = 0.05;
    this.maxVelocity = 2;
    this.mass = 5;
    this.isAnimating = false;
    this.frameTimer = 0;
    this.frameDuration = (1 / 10) * 100;
    this.maxAnimationFrames = this.frameMap.size;
  }

  generatePatrolPoints() {
    // Generate random patrol points within the area
    let points = [];
    for (let i = 0; i < 5; i++) {
      points.push({
        x: this.x + (Math.random() - 0.5) * this.detectionRadius,
        y: this.y + (Math.random() - 0.5) * this.detectionRadius,
      });
    }
    return points;
  }

  draw() {
    if (assets.images.purpleBlob.isLoaded) {
      super.drawImage(c, this.x - 32, this.y - 32);
    }
  }

  startAnimation() {
    this.isAnimating = true;
    this.frame = 0;
  }

  playerDetection() {
    const distPlEn = Math.hypot(player.x - this.x, player.y - this.y);
    return distPlEn < this.detectionRadius;
  }

  insideCameraView() {
    if (
      // adding a bit of margin so enemy doesnt get cut off on the edges
      this.x > camera.x - this.margin &&
      this.x < camera.x + camera.width + this.margin &&
      this.y > camera.y - this.margin &&
      this.y < camera.y + camera.height + this.margin
    ) {
      return true;
    }
    return false;
  }

  handleEnemyVelocity() {
    // Apply Friction to slow down gradually on keyup
    this.velocity.x *= friction;
    this.velocity.y *= friction;

    // Calculate velocity Magnitute through pythagoras theorem
    const velocityMagnitude = Math.sqrt(
      this.velocity.x ** 2 + this.velocity.y ** 2
    );

    // Handle if velocity is very small then set it to 0
    const minVelocityThreshold = 0.01;
    if (velocityMagnitude < minVelocityThreshold) {
      this.velocity.x = 0;
      this.velocity.y = 0;
    }

    // Limit the velocity to the maximum velocity
    if (velocityMagnitude > this.maxVelocity) {
      const scale = this.maxVelocity / velocityMagnitude;
      this.velocity.x *= scale;
      this.velocity.y *= scale;
    }
  }

  isAtTarget(target) {
    const tolerance = 5;
    return Math.hypot(target.x - this.x, target.y - this.y) < tolerance;
  }

  moveToTarget(target) {
    const angle = Math.atan2(target.y - this.y, target.x - this.x);
    this.velocity.x += Math.cos(angle) * this.speed;
    this.velocity.y += Math.sin(angle) * this.speed;
  }

  update(delta) {
    if (this.playerDetection() || this.hit) {
      this.state = "chasing";
    } else if (this.state !== "patrolling") {
      this.state = "idle";
    }

    switch (this.state) {
      case "idle":
        this.idleTime++;
        if (this.idleTime > 200) {
          this.state = "patrolling";
          this.idleTime = 0;
        }
        break;

      case "patrolling":
        this.moveToTarget(this.patrolPoints[this.currentPatrolPoint]);
        if (this.isAtTarget(this.patrolPoints[this.currentPatrolPoint])) {
          this.currentPatrolPoint =
            (this.currentPatrolPoint + 1) % this.patrolPoints.length;
          this.state = "idle";
        }
        break;

      case "chasing":
        this.moveToTarget(player);
        break;
    }

    if (this.insideCameraView()) {
      this.draw();
      this.visible = true;
    } else {
      this.visible = false;
    }

    this.handleEnemyVelocity();

    this.x = Math.max(
      this.radius,
      Math.min(
        map.tilesCountX * map.tileWidth - this.radius,
        this.x + this.velocity.x * delta
      )
    );

    this.y = Math.max(
      this.radius,
      Math.min(
        map.tilesCountY * map.tileHeight - this.radius,
        this.y + this.velocity.y * delta
      )
    );

    if (this.isAnimating) {
      this.frameTimer += delta;
      while (this.frameTimer >= this.frameDuration) {
        this.frameTimer -= this.frameDuration;
        this.frame++;
        if (this.frame >= this.maxAnimationFrames) {
          this.isAnimating = false;
          this.frame = 0;
        }
      }
    }
  }
}

export default Enemy;
