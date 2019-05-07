import React from 'react';
import Square from './Square';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { squares: Array(9).fill(null), userTurn: true };
    this.resetGame = this.resetGame.bind(this);
  }

  resetGame() {
    this.setState({ squares: Array(9).fill(null), userTurn: true });
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.userTurn ? 'X' : 'O';
    this.setState({ squares: squares, userTurn: !this.state.userTurn });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner === 'Tie') {
      status = winner + '!';
    } else if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Player Turn: ' + (this.state.userTurn ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        {winner ? <button onClick={this.resetGame}>Play Again</button> : null}
      </div>
    );
  }
}

function calculateWinner(squares) {
  if (squares.filter(a => a === null).length === 0) {
    return 'Tie';
  }
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
  return null;
}

function emptySpaces() {
  const board = this.state.squares;
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

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (calculateWinner() === 'X') {
    return { score: -10 };
  } else if (calculateWinner() === 'O') {
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
      result = minimax(newBoard, 'X');
      move.score = result.score;
    }
    newBoard[availSpots[i]] = ' ';
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

export default Board;
