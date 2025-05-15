let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (board[index] !== "" || !gameActive || currentPlayer !== "X") return;

  makeMove(index, "X");

  if (gameActive) {
    setTimeout(() => {
      computerMove();
    }, 500); // delay for better user experience
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;

  if (checkWinner(player)) {
    statusDisplay.textContent = `${player} wins!`;
    gameActive = false;
  } else if (!board.includes("")) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = player === "X" ? "O" : "X";
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  }
}

function computerMove() {
  if (!gameActive) return;

  let available = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter(val => val !== null);

  // pick a random available cell
  let randomIndex = available[Math.floor(Math.random() * available.length)];
  makeMove(randomIndex, "O");
}

function checkWinner(player) {
  return winningCombinations.some(combination => {
    return combination.every(i => board[i] === player);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
