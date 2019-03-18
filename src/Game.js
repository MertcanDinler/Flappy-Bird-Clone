import { CANVAS_WIDTH, CANVAS_HEIGHT, INITIAL_PIPE_SPACE } from "./configs";
import Bird from "./models/Bird";
import Pipe from "./models/Pipe";

export default class Game {
  constructor(context, onScoreChanged=null) {
    this.ctx = context;
    this.onScoreChanged = (typeof onScoreChanged === "function") ? onScoreChanged : null;
  }

  init() {
    this.frame_count = 0;
    this.space = INITIAL_PIPE_SPACE;
    this.loop = null;
    this.pipes = this.generatePipes();
    this.bird = this.generateBird();
    
  }

  start() {
    this.init();
    this.loop = setInterval(this.gameLoop, 1000 / 60);
    if(this.onScoreChanged !== null){
      this.onScoreChanged(0);
    }
  }

  stop() {
    clearInterval(this.loop);
  }

  restart() {
    this.stop();
    this.init();
    this.start();
  }

  _handleKeyDown = e => {
    if (e.code === "Space") {
      this.bird.jump();
    }
  };
  generateBird() {
    const bird = new Bird(this.ctx, this.onScoreChanged)
    return bird;
  }

  generatePipes() {
    const first_pipe = new Pipe(this.ctx, null, this.space);
    const second_pipe = new Pipe(
      this.ctx,
      CANVAS_HEIGHT - first_pipe.height - this.space,
      this.space, true
    );
    return [first_pipe, second_pipe];
  }

  gameLoop = () => {
    this.update();
    this.draw();
  };

  update() {
    this.frame_count++;
    if (this.frame_count % 100 === 0) {
      this.frame_count = 0;
      const pipes = this.generatePipes();
      this.pipes.push(...pipes);
    }
    this.pipes = this.pipes.filter(pipe => !pipe.is_dead());
    this.pipes.forEach(pipe => {
      if (pipe.collision(this.bird)) {
        this.restart();
      }
      pipe.pass(this.bird);
      pipe.update();
    });
    if (this.bird.checkCanvasCollision()) {
      this.restart();
    }
    this.bird.update();
  }

  draw() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.pipes.forEach(pipe => pipe.draw());
    this.bird.draw();
  }
}
