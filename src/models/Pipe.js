import {
  CANVAS_HEIGHT,
  PIPE_WIDTH,
  MINIMUM_PIPE_HEIGHT,
  CANVAS_WIDTH,
  BIRD_WIDTH,
  BIRD_HEIGHT
} from "../configs";

export default class Pipe {
  constructor(context, space) {
    this.ctx = context;
    this.passed = false;
    this.x = CANVAS_WIDTH;
    this.space_start =
      MINIMUM_PIPE_HEIGHT +
      Math.random() * (CANVAS_HEIGHT - space - MINIMUM_PIPE_HEIGHT * 2);
    this.space_end = this.space_start + space;
    this.bottom_pipe_height = CANVAS_HEIGHT - this.space_end;
  }

  draw() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(this.x, 0, PIPE_WIDTH, this.space_start);
    this.ctx.fillRect(
      this.x,
      this.space_end,
      PIPE_WIDTH,
      this.bottom_pipe_height
    );
  }

  update() {
    this.x -= 2;
  }

  is_dead() {
    return this.x + PIPE_WIDTH < 0;
  }

  collision(bird) {
    return (
      bird.x + BIRD_WIDTH >= this.x &&
      bird.x - BIRD_HEIGHT <= this.x + PIPE_WIDTH &&
      ((bird.y + BIRD_HEIGHT >= 0 &&
        bird.y - BIRD_HEIGHT <= this.space_start) ||
        (bird.y + BIRD_HEIGHT >= this.space_end &&
          bird.y - BIRD_HEIGHT <= CANVAS_HEIGHT))
    );
  }

  pass(bird) {
    const passed = bird.x > this.x + PIPE_WIDTH;
    if (passed !== this.passed) {
      this.passed = passed;
      bird.addScore();
    }

    return passed;
  }
}
