import {
  CANVAS_HEIGHT,
  PIPE_WIDTH,
  MINIMUM_PIPE_HEIGHT,
  CANVAS_WIDTH,
  BIRD_WIDTH,
  BIRD_HEIGHT
} from "../configs";

export default class Pipe {
  constructor(context, height, space, is_bottom= false) {
    this.ctx = context;
    this.x = CANVAS_WIDTH;
    this.y = height ? CANVAS_HEIGHT - height : 0;
    this.width = PIPE_WIDTH;
    this.height =
      height ||
      MINIMUM_PIPE_HEIGHT +
        Math.random() * (CANVAS_HEIGHT - space - MINIMUM_PIPE_HEIGHT * 2);
    this.passed = false;
    this.is_bottom = is_bottom;
  }

  draw() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= 2;
  }

  is_dead() {
    if (this.x + PIPE_WIDTH < 0) {
      return true;
    }
    return false;
  }

  collision(bird) {
    // const pipe_top_left = { x: this.x, y: this.y };
    // const pipe_bottom_left = { x: this.x, y: this.y + this.height };
    // const pipe_top_right = { x: this.x + this.width, y: this.y };
    // const pipe_bottom_right = {
    //   x: this.x + this.width,
    //   y: this.y + this.height
    // };
    const bird_half_width = BIRD_WIDTH;
    const bird_half_height = BIRD_HEIGHT;
    if (
      bird.x + bird_half_width >= this.x &&
      bird.y + bird_half_height >= this.y &&
      bird.x - bird_half_width <= this.x + this.width &&
      bird.y - bird_half_height <= this.y + this.height
    ) {
      return true;
    }
    return false;
  }

  pass(bird) {
    if(this.is_bottom === false) return false;
    const passed = bird.x > this.x;
    if(passed !== this.passed){
      this.passed = passed;
      bird.addScore();
    }

    return passed;
  }
}
