import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ties: 0,
      losses: 0,
    };
  }

  async componentDidMount() {
    const response = await fetch('/api/stats');
    const stats = await response.json();
    console.log(stats);
    this.setState({ ties: stats.ties, losses: stats.losses });
  }

  render() {
    return (
      <div className="game">
        <div>{'All Time Statistics'}</div>
        <div>{'-------------------'}</div>
        <div>{'  Ties: ' + this.state.ties}</div>
        <div>{'Losses: ' + this.state.losses}</div>
        <br />
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info" />
      </div>
    );
  }
}

export default Game;
