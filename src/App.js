import React, { Component } from "react";
import "./App.css";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./configs";
import Game from "./Game";

class App extends Component {
  constructor(props) {
    super(props);
    this.canvas_ref = React.createRef();
    this.game = null;
    this.state = {
      score: 0,
      high_score: 0
    }
  }

  componentDidMount() {
    const ctx = this.canvas_ref.current.getContext("2d");
    this.game = new Game(ctx, this.onScoreChanged);
    document.addEventListener("keydown", this.game._handleKeyDown);
    this.game.start();
  }
  onScoreChanged = (score) => {
    let high_score = this.state.high_score
    if(score > high_score){
      high_score = score;
    }
    this.setState({
      score,
      high_score
    });
  }
  render() {
    return (
      <div className="App">
      <div>
        Score: {this.state.score} <br />
        High Score: {this.state.high_score}
      </div>
        <canvas
          ref={this.canvas_ref}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{
            marginTop: 20,
            border: "1px solid #ccc"
          }}
        />
      </div>
    );
  }
}

export default App;
