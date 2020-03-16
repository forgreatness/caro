import React from 'react';
import './App.css';

function Square(props) {
  return (
    <button className="square" data-value={props.value} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }

  renderRow(rowIndex, numCols) {
    let row = [];

    for (let i = 0; i < numCols; i++) {
      row.push(this.renderSquare(rowIndex*numCols+i))
    }

    return <div className="board-row" key={`row${rowIndex}`}>{row}</div>
  }

  renderBoard(numRows, numCols) {
    let board = [];

    for (let i = 0; i < numRows; i++) {
      board.push(this.renderRow(i, numCols));
    }

    return board;
  }

  render() {
    return (
      <div>
        {this.renderBoard(this.props.numRows, this.props.numCols)}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      history: [{
        squares: Array(400).fill(null)
      }],
      xIsNext: true,
      moveNumber: 0
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.moveNumber];

    console.log(history.length);
    console.log(this.state.moveNumber);

    let status;

    if (this.state.winner != null) {
      status = `Winner: ${this.state.winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board numRows={20} numCols={20} winCondition={5} squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={() => this.previousMove()}>Redo</button>
            <button onClick={() => this.restartGame()}>Restart</button>
          </div>
        </div>
      </div>
    );
  }

  previousMove() {
    if (this.state.moveNumber === 0) {
      return;
    }
    
    const history = this.state.history.slice(0, this.state.moveNumber);

    console.log(history.length);

    this.setState({
      history: history,
      moveNumber: history.length - 1,
      xIsNext: !this.state.xIsNext,
      winner: null
    });
  }

  restartGame() {
    this.setState({
      winner: null,
      history: [{
        squares: Array(400).fill(null)
      }],
      xIsNext: true,
      moveNumber: 0
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.moveNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i] || this.state.winner != null) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    const line = calculateWinningLine(squares, i , 20, 20, 5);

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      moveNumber: history.length,
      xIsNext: !this.state.xIsNext,
      winner: (line != null) ? squares[i] : null
    });
  }
}

export default Game;

function calculateWinningLine(squares, i, numBoardRows, numBoardCols, winCondition) {
  let line;
  const leftMargin = i % numBoardCols;
  const topMargin = parseInt(i / numBoardCols);
  const rightMargin = (numBoardCols - 1) - leftMargin;
  const bottomMargin = (numBoardRows - 1) - topMargin;

  //Rows
  line = [];
  const firstSquareOfCurrentRow = topMargin * numBoardCols;
  const lastSquareOfCurrentRow = firstSquareOfCurrentRow + (numBoardCols - 1);
  const startingRowIndex = Math.max(firstSquareOfCurrentRow, i - (winCondition - 1));
  const endingRowIndex = Math.min(lastSquareOfCurrentRow, i + (winCondition - 1));

  for (let j = startingRowIndex; j <= endingRowIndex && (endingRowIndex - j + 1) >= (winCondition - line.length); j++) {
    if (squares[j] == null || squares[j] !== squares[i]) {
      line = [];
    } else {
      line.unshift(j)
      if (line.length === winCondition) {
        return line;
      }
    }
  }

  //Columns
  line = [];
  const firstSquareOfCurrentCol = i % numBoardCols;
  const lastSquareOfCurrentCol = firstSquareOfCurrentCol + numBoardCols * (numBoardRows - 1);
  const startingColIndex = Math.max(firstSquareOfCurrentCol, i - (winCondition - 1) * numBoardCols);
  const endingColIndex = Math.min(lastSquareOfCurrentCol, i + (winCondition - 1) * numBoardCols);
  
  for (let j = startingColIndex; j <= endingColIndex && ((endingColIndex - j) / numBoardCols + 1) >= (winCondition - line.length); j+=numBoardCols) {
    if (squares[j] == null || squares[j] !== squares[i]) {
      line = [];
    } else {
      line.unshift(j)
      if (line.length === winCondition) {
        return line;
      }
    }
  }
    
  //LRDiagonal
  line = [];
  const LRDTopMargin = Math.min(leftMargin, topMargin);
  const LRDBottomMargin = Math.min(rightMargin, bottomMargin);
  const LRDiagonalDistance = numBoardCols + 1;
  const startingLRDIndex = Math.max(i - (winCondition - 1) * LRDiagonalDistance, i - LRDTopMargin * LRDiagonalDistance);
  const endingLRDIndex = Math.min(i + (winCondition + 1) * LRDiagonalDistance, i + LRDBottomMargin * LRDiagonalDistance);
  
  for (let j = startingLRDIndex; j <= endingLRDIndex && ((endingLRDIndex - j) / LRDiagonalDistance + 1) >= (winCondition - line.length); j+=LRDiagonalDistance) {
    if (squares[j] == null || squares[j] !== squares[i]) {
      line = [];
    } else {
      line.unshift(j)
      if (line.length === winCondition) {
        return line;
      }
    }
  }

  //RLDiagonal
  line = [];
  const RLDTopMargin = Math.min(rightMargin, topMargin);
  const RLDBottomMargin = Math.min(bottomMargin, leftMargin);
  const RLDiagonalDistance = numBoardCols - 1;
  const startingRLDIndex = Math.max(i - (winCondition - 1) * RLDiagonalDistance, i - RLDTopMargin * RLDiagonalDistance);
  const endingRLDIndex = Math.min(i + (winCondition - 1) * RLDiagonalDistance, i + RLDBottomMargin * RLDiagonalDistance);

  for (let j = startingRLDIndex; j <= endingRLDIndex && ((endingRLDIndex - j) / RLDiagonalDistance + 1) >= (winCondition - line.length); j+=RLDiagonalDistance) {
    if (squares[j] == null || squares[j] !== squares[i]) {
      line = [];
    } else {
      line.unshift(j)
      if (line.length === winCondition) {
        return line;
      }
    }
  }

  return null;
} 
