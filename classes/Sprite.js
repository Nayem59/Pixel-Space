import Vector2 from "./Vector2.js";

class Sprite {
  constructor({
    asset, // image to draw
    frameSize, // crop size of the image
    hFrames, // sprite layout horizontally
    vFrames, // sprite layout vertically
    frame, // frame number
    scale, // size of the image
    position, // position of the image to the canvas
  }) {
    this.asset = asset;
    this.frameSize = frameSize ?? new Vector2(32, 32);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    // Map() to store the frame grid of the image
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.generateframeMap();
    this.isAnimating = false;
    this.frameTimer = 0;
    this.frameDuration = (1 / 60) * 100;
    this.maxAnimationFrames = this.frameMap.size;
  }

  generateframeMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
        frameCount++;
      }
    }
  }

  animate(delta, withDestroy) {
    if (this.isAnimating) {
      this.frameTimer += delta;
      while (this.frameTimer >= this.frameDuration) {
        this.frameTimer -= this.frameDuration;
        this.frame++;
        if (this.frame >= this.maxAnimationFrames) {
          this.isAnimating = false;
          this.frame = 0;
          if (withDestroy) {
            this.destroy = true;
          }
        }
      }
    }
  }

  continuousAnimation(delta, endFrame = null, startFrame = null) {
    // Default to 0 if startFrame is null
    const start = startFrame ?? 0;

    // Default to maxAnimationFrames if endFrame is null
    const end = endFrame ?? this.maxAnimationFrames - 1;

    // Validate the frame range
    if (start > end || start < 0 || end >= this.maxAnimationFrames) {
      throw new Error("Invalid startFrame or endFrame");
    }

    // If the current frame is not initialized or out of range, set it to start
    if (this.frame < start || this.frame > end) {
      this.frame = start;
    }

    // Increment the frame timer by delta time
    this.frameTimer += delta;

    // Check if it's time to update the frame
    while (this.frameTimer >= this.frameDuration) {
      this.frameTimer -= this.frameDuration; // Reset the timer by the frame duration

      // Loop within the range [start, end]
      this.frame = this.frame + 1 > end ? start : this.frame + 1;
    }
  }

  drawImage(c, x, y) {
    if (!this.asset.isLoaded) {
      console.log("asset not loaded yet");
      return;
    }

    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    c.drawImage(
      this.asset.image,
      frameCoordX,
      frameCoordY,
      frameSizeX,
      frameSizeY,
      x,
      y,
      frameSizeX * this.scale,
      frameSizeY * this.scale
    );
  }
}

export default Sprite;
