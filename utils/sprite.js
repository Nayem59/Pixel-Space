import Vector2 from "../classes/Vector2.js";

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
