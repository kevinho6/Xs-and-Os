import React from 'react';
import Board from './Board';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      finished: false,
      stats: { ties: 0, losses: 0 },
    };
    this.resetGame = this.resetGame.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/api/stats');
    const stats = await response.json();
    this.setState({
      stats: { ties: stats.ties, losses: stats.losses },
    });
  }

  resetGame() {
    this.setState({ squares: Array(9).fill(null), finished: false });
  }

  async handleClick(i) {
    const squares = this.state.squares.slice();
    let winner = calculateWinner(squares);

    if (winner || squares[i] || this.state.finished) {
      return;
    }

    squares[i] = 'X';
    const computerMove = minimax(squares, 'O');
    squares[computerMove.index] = 'O';
    this.setState({ squares: squares });

    winner = calculateWinner(squares);

    if (winner && !this.state.finished) {
      let stats, response;
      if (winner === 'O') {
        response = await fetch('/api/stats/loss', { method: 'PUT' });
      } else {
        response = await fetch('/api/stats/tie', { method: 'PUT' });
      }
      stats = await response.json();

      this.setState({
        finished: true,
        stats: { ties: stats.ties, losses: stats.losses },
      });
    }
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) {
      if (winner === 'Tie') {
        status = winner + '!';
      } else {
        status = winner + ' Wins!';
      }
    } else {
      status = '';
    }

    return (
      <div className="game">
        <div>{'All Time Statistics'}</div>
        <div>{'-------------------'}</div>
        <div>{'  Ties: ' + this.state.stats.ties}</div>
        <div>{'Losses: ' + this.state.stats.losses}</div>
        <div className="status">{status}</div>
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="play-again">
          {winner ? <button onClick={this.resetGame}>Play Again</button> : null}
        </div>
        <div className="game-info" />
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.filter(a => a === null).length === 0) {
    return 'Tie';
  }
  return null;
}

function emptySpaces(board) {
  const spaces = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      spaces.push(i);
    }
  }
  return spaces;
}

function minimax(newBoard, player) {
  const availSpots = emptySpaces(newBoard);

  if (calculateWinner(newBoard) === 'X') {
    return { score: -10 };
  } else if (calculateWinner(newBoard) === 'O') {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  let moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = availSpots[i];
    newBoard[availSpots[i]] = player;

    let result;
    if (player === 'O') {
      result = minimax(newBoard, 'X');
      move.score = result.score;
    } else {
      result = minimax(newBoard, 'O');
      move.score = result.score;
    }
    newBoard[availSpots[i]] = null;
    moves.push(move);
  }
  let bestMove;
  if (player === 'O') {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

export default Game;
