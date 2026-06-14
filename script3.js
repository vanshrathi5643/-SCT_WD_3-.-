const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let board = ["","","","","","","","",""];

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", cellClick);
});

restartBtn.addEventListener("click", restartGame);

function cellClick(){

    const index = this.getAttribute("data-index");

    if(board[index] !== "" || !gameActive){
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if(gameActive){
        statusText.textContent =
        `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner(){

    let won = false;

    winPatterns.forEach(pattern => {

        const a = board[pattern[0]];
        const b = board[pattern[1]];
        const c = board[pattern[2]];

        if(a === "" || b === "" || c === ""){
            return;
        }

        if(a === b && b === c){
            won = true;
        }
    });

    if(won){
        statusText.textContent =
        `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if(!board.includes("")){
        statusText.textContent = "Draw!";
        gameActive = false;
    }
}

function restartGame(){

    board = ["","","","","","","","",""];

    gameActive = true;

    currentPlayer = "X";

    statusText.textContent =
    "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}