import { c } from "../utils/canvas.js";
import { assets } from "../utils/assets.js";
import { shipExFire, camera } from "../main.js";

class Player {
  constructor(x, y, radius, color, velocity, map) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.mass = 1;
    this.speed = 0.2;
    this.maxVelocity = 3;
    this.rotation = 0;
    this.degree = 0;
    this.map = map;
    this.damage = 1;
  }

  draw() {
    // for collision and debug purposes
    // c.beginPath();
    // c.arc(
    //   this.x - camera.x,
    //   this.y - camera.y,
    //   this.radius,
    //   0,
    //   Math.PI * 2,
    //   false
    // );
    // c.fillStyle = this.color;
    // c.fill();

    c.save();
    c.translate(this.x - camera.x, this.y - camera.y);
    c.rotate((this.degree * Math.PI) / 180);
    c.translate(-(this.x - camera.x), -(this.y - camera.y));
    if (assets.images.ship1.isLoaded) {
      c.save();
      // c.shadowColor = "black";
      // c.shadowOffsetX = 10;
      // c.shadowOffsetY = 10;
      // c.shadowBlur = 5;
      c.drawImage(
        assets.images.ship1.image,
        this.x - camera.x - 24,
        this.y - camera.y - 25
      );
      c.restore();
    }
    shipExFire.drawImage(c, this.x - camera.x - 24, this.y - camera.y - 15);
    c.restore();
  }

  update(delta) {
    this.degree += this.rotation * delta;

    this.x = Math.max(
      this.radius,
      Math.min(
        this.map.tilesCountX * this.map.tileWidth - this.radius,
        this.x + this.velocity.x * delta
      )
    );

    this.y = Math.max(
      this.radius,
      Math.min(
        this.map.tilesCountY * this.map.tileHeight - this.radius,
        this.y + this.velocity.y * delta
      )
    );
  }
}

export default Player;
