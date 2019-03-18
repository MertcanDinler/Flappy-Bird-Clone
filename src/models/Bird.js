import {
  GRAVITY,
  VELOCITY,
  BIRD_WIDTH,
  CANVAS_HEIGHT,
  BIRD_HEIGHT
} from "../configs";

export default class Bird {
  constructor(context, onScoreChanged) {
    this.ctx = context;
    this.x = 100;
    this.y = 150;
    this.is_dead = false;
    this.gravity = 0;
    this.score = 0;
    this.onScoreChanged = (typeof onScoreChanged === "function") ? onScoreChanged : null;
  }

  draw() {
    this.ctx.fillStyle = "#88dff7";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, BIRD_WIDTH, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  update() {
    this.gravity += VELOCITY;
    this.gravity = Math.min(GRAVITY, this.gravity);
    this.y += this.gravity;
  }

  jump() {
    this.gravity = -1 * GRAVITY;
  }

  checkCanvasCollision() {
    return this.y - BIRD_HEIGHT <= 0 || this.y + BIRD_HEIGHT >= CANVAS_HEIGHT;
  }

  addScore() {
    this.score++;
    if(this.onScoreChanged !== null){
      this.onScoreChanged(this.score);
    }
  }

}
