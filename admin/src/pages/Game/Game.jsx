// ✅ src/pages/TicTacToe.jsx
import React, { useState, useEffect } from "react";
import "./Game.css";

const TicTacToe = () => {
  const [gameState, setGameState] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameActive, setGameActive] = useState(true);
  const [status, setStatus] = useState("");

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (board) => {
    for (let [a, b, c] of winningConditions) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes("") ? null : "draw";
  };

  const minimax = (board, depth, isMaximizing) => {
    const scores = { X: -1, O: 1, draw: 0 };
    const result = checkWinner(board);
    if (result !== null) return scores[result];

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "O";
          const score = minimax(board, depth + 1, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "X";
          const score = minimax(board, depth + 1, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (board) => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, 0, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const handleClick = (index) => {
    if (!gameActive || gameState[index] !== "") return;

    const newGameState = [...gameState];
    newGameState[index] = currentPlayer;
    setGameState(newGameState);

    const result = checkWinner(newGameState);
    if (result) {
      setStatus(result === "draw" ? "It's a draw!" : `${currentPlayer} wins!`);
      setGameActive(false);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  useEffect(() => {
    if (currentPlayer === "O" && gameActive) {
      const bestMove = getBestMove([...gameState]);
      if (bestMove !== undefined) {
        setTimeout(() => handleClick(bestMove), 500);
      }
    }
  }, [currentPlayer]);

  const restartGame = () => {
    setGameState(Array(9).fill(""));
    setCurrentPlayer("X");
    setGameActive(true);
    setStatus("");
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {gameState.map((cell, i) => (
          <div
            key={i}
            className="cell"
            onClick={() => handleClick(i)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="buttons_container">
        <button className="btns" onClick={restartGame}>Restart</button>
      </div>
    </div>
  );
};

export default TicTacToe;