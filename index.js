const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let boardState = ["", "", "", "", "", "", "", "", ""];

// Winning patterns
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach((cell) => {
  cell.addEventListener("click", cellClick);
});

function cellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (boardState[index] !== "" || !gameActive) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();
  switchPlayer();
}

function switchPlayer() {
  if (!gameActive) return;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}’s Turn`;
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      boardState[a] && 
      boardState[a] === boardState[b] && 
      boardState[a] === boardState[c]
    ) {
      gameActive = false;
      statusText.textContent = `Player ${boardState[a]} Wins!`;

      highlightWinner(pattern);
      return;
    }
  }

  if (!boardState.includes("")) {
    gameActive = false;
    statusText.textContent = "It’s a Draw!";
  }
}

function highlightWinner(pattern) {
  pattern.forEach(index => {
    cells[index].classList.add("winner");
  });
}

restartBtn.addEventListener("click", () => {
  boardState.fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });

  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X’s Turn";
});
