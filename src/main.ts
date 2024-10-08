const MOVES = ["Rock", "Scissors", "Paper", "Spock", "Lizard"];
const winningCombinations: { [key: string]: string[] } = {
  Rock: ["Scissors", "Lizard"],
  Scissors: ["Paper", "Lizard"],
  Paper: ["Rock", "Spock"],
  Spock: ["Scissors", "Rock"],
  Lizard: ["Paper", "Spock"],
};

let totalRounds: number;
let currentRound: number = 0;
let playerScore: number = 0;
let computerScore: number = 0;

document.getElementById("startGame")?.addEventListener("click", () => {
  const selectedRounds = document.querySelector(
    'input[name="rounds"]:checked'
  ) as HTMLInputElement;

  if (!selectedRounds) {
    alert("Bitte wähle die Anzahl der Runden aus!");
    return;
  }

  totalRounds = parseInt(selectedRounds.value);
  currentRound = 0;
  playerScore = 0;
  computerScore = 0;

  document.getElementById("game")!.style.display = "block";
  document.getElementById("result")!.style.display = "none";
  document.getElementById("resultMessage")!.innerText = "";
  updateDisplay();
});

document.querySelectorAll(".move").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (currentRound < totalRounds) {
      const playerMove = (event.target as HTMLButtonElement).id;
      const computerMove = MOVES[Math.floor(Math.random() * MOVES.length)];
      determineWinner(playerMove, computerMove);
      currentRound++;
      updateDisplay();
    }
  });
});

function determineWinner(playerMove: string, computerMove: string) {
  document.getElementById("playerChoice")!.innerText = playerMove;
  document.getElementById("computerChoice")!.innerText = computerMove;

  let message = "";

  if (playerMove === computerMove) {
    message = "Draw!";
  } else if (winningCombinations[playerMove].includes(computerMove)) {
    playerScore++;
    message = `${playerMove} beats ${computerMove}!`;
  } else {
    computerScore++;
    message = `${computerMove} beats ${playerMove}!`;
  }

  document.getElementById("resultMessage")!.innerText = message;
}

function updateDisplay() {
  document.getElementById("currentRound")!.innerText = currentRound.toString();
  document.getElementById("playerScore")!.innerText = playerScore.toString();
  document.getElementById("computerScore")!.innerText =
    computerScore.toString();

  if (currentRound === totalRounds) {
    endGame();
  }
}

function endGame() {
  let resultText = "Draw!";
  if (playerScore > computerScore) {
    resultText = "You've won!";
  } else if (playerScore < computerScore) {
    resultText = "Computer has won!";
  }

  document.getElementById("result")!.innerText = resultText;
  document.getElementById("result")!.style.display = "block";

  document.getElementById("game")!.style.display = "none";
}
