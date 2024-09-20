import { c } from "../utils/canvas.js";
import Sprite from "./Sprite.js";

class HomingMissile extends Sprite {
  constructor(x, y, radius, color, velocity, angle, spriteConfig) {
    super(spriteConfig);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.angle = angle;
    this.speed = 0.1;
    this.mass = 5;
    this.frameDuration = (1 / 20) * 100;
    this.lifeSpan = 500;
    this.damageMultiplier = 2;
  }

  moveToTarget(target) {
    const angle = Math.atan2(target.y - this.y, target.x - this.x);
    this.velocity.x += Math.cos(angle) * this.speed;
    this.velocity.y += Math.sin(angle) * this.speed;

    // Normalize velocity to prevent excessive speed
    const velocityMagnitude = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y
    );
    const maxSpeed = 5;
    if (velocityMagnitude > maxSpeed) {
      this.velocity.x = (this.velocity.x / velocityMagnitude) * maxSpeed;
      this.velocity.y = (this.velocity.y / velocityMagnitude) * maxSpeed;
    }

    // Update the missile's angle smoothly
    this.angle = this.lerpAngle(this.angle, angle, 0.05);
  }

  lerpAngle(angle1, angle2, t) {
    // Ensure the angles are within [0, 2π] to start with
    angle1 = (angle1 + 2 * Math.PI) % (2 * Math.PI);
    angle2 = (angle2 + 2 * Math.PI) % (2 * Math.PI);

    // Calculate the difference between the angles
    let difference = angle2 - angle1;

    // Ensure the difference is the shortest path (i.e., minimal angle difference)
    if (difference > Math.PI) {
      difference -= 2 * Math.PI; // Rotate backward
    } else if (difference < -Math.PI) {
      difference += 2 * Math.PI; // Rotate forward
    }

    // Perform the interpolation
    return angle1 + difference * t;
  }

  draw() {
    // for collision and debug purposes
    // c.beginPath();
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = this.color;
    // c.fill();

    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle + Math.PI / 2);
    c.translate(-this.x, -this.y);

    super.drawImage(c, this.x - 16, this.y - 16);
    c.restore();
  }

  update(delta) {
    this.x = this.x + this.velocity.x * delta;
    this.y = this.y + this.velocity.y * delta;
    this.lifeSpan--;
    this.draw();
    this.continuousAnimation(delta);
  }
}

export default HomingMissile;
