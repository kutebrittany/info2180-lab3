document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const squares = board.getElementsByTagName("div");
  const status = document.getElementById("status");
  const newGameBtn = document.querySelector(".btn");

  const defaultMessage =
    "Move your mouse over a square and click to play an X or an O.";

  // Game state: one entry per square ("X", "O" or null)
  let gameState = [null, null, null, null, null, null, null, null, null];
  let currentPlayer = "X";
  let gameOver = false;

  // All 8 ways to win (indexes of the squares)
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  // Exercise 1: style each square
  for (let i = 0; i < squares.length; i++) {
    squares[i].classList.add("square");
  }

  // Returns "X" or "O" if someone has won, otherwise null
  function checkWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (
        gameState[a] !== null &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  }

  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];

    // Exercise 2, 4 and 6: handle clicks
    square.addEventListener("click", function () {
      // Exercise 6: no cheating (can't overwrite a square or play after a win)
      if (gameState[i] !== null || gameOver) {
        return;
      }

      gameState[i] = currentPlayer;
      square.textContent = currentPlayer;
      square.classList.add(currentPlayer);

      // Exercise 4: check for a winner
      const winner = checkWinner();
      if (winner) {
        status.textContent = "Congratulations! " + winner + " is the Winner!";
        status.classList.add("you-won");
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    });

    // Exercise 3: hover effect
    square.addEventListener("mouseover", function () {
      square.classList.add("hover");
    });

    square.addEventListener("mouseout", function () {
      square.classList.remove("hover");
    });
  }

  // Exercise 5: restart the game
  newGameBtn.addEventListener("click", function () {
    for (let i = 0; i < squares.length; i++) {
      squares[i].textContent = "";
      squares[i].classList.remove("X", "O", "hover");
    }
    gameState = [null, null, null, null, null, null, null, null, null];
    currentPlayer = "X";
    gameOver = false;
    status.textContent = defaultMessage;
    status.classList.remove("you-won");
  });
});