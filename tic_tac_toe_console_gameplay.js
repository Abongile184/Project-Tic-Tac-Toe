// step 1:  create a Gameboard object with an array to store the game state
let playerOne, playerTwo, Computer;

const Gameboard = (function() {
    let arrayBoard = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];

    const getBoard = () => arrayBoard;

    const resetBoard = () => {
        arrayBoard = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]
        ];
    };

    const updateBoard = (row, col, marker) => {
        if(arrayBoard[row][col] === " ") {
            arrayBoard[row][col] = marker;
        } else {
            console.log("Position already occupied!");
        }
    };

    const getBoardState = () => {
        return arrayBoard;
    }

    return { getBoard, resetBoard, updateBoard, getBoardState };
})();


//step 2: create Player objects to store each player information 
const Player = (name, marker) => {
    const player = {
        name,
        marker,
        getName: () => name,
        getMarker: () => marker
    }
    return player;
}


//step 3: create a game object to control the game flow:

// Prompt for player names and markers
const playerOneName = prompt("Enter Player One's name:");
const playerOneMarker = prompt("Enter Player One's marker (X or O):");
const playerTwoName = prompt("Enter Player Two's name:");
const playerTwoMarker = prompt("Enter Player Two's marker (X or O):");

// Create Player objects

playerOne = Player(playerOneName, playerOneMarker);
playerTwo = Player(playerTwoName, playerTwoMarker);

const Gameplay = (function() {
    let currentPlayer = playerOne;
    let gameState = "inProgress";

    const winArrays = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const startGame = () => {
        Gameboard.resetBoard();
        currentPlayer = playerOne;
        gameState = "inProgress";
        console.log("Game started!");
        playTurn(); // Start the first turn
    };

    const playTurn = () => {
        if (gameState === "finished") {
            console.log("Game is finished!");
            return;
        }

        const row = parseInt(prompt(`${currentPlayer.getName()}, enter the row (0, 1, or 2):`));
        const col = parseInt(prompt(`${currentPlayer.getName()}, enter the column (0, 1, or 2):`));

        makeMove(row, col);
        
    };

    const makeMove = (row, col) => {
        if (gameState !== "inProgress") {
            console.log("Game is not in progress!");
            return;
        }

        Gameboard.updateBoard(row, col, currentPlayer.getMarker());


        if (checkForWin()) {
            gameState = "finished";
            console.log(`${currentPlayer.getName()} wins!`);
        } else if (checkForTie()) {
            gameState = "finished";
            console.log("It's a tie!");
        } else {
            switchPlayer();
            playTurn(); // Prompt for the next move
        }
    };

    const checkForWin = () => {
        const board = Gameboard.getBoard();
        const flatBoard = board.flat();

        return winArrays.some(combination =>
            combination.every(index => flatBoard[index] === currentPlayer.getMarker())
        );
    };

    const checkForTie = () => {
        const board = Gameboard.getBoard();
        return board.flat().every(cell => cell !== " ");
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    return {
        startGame,
        makeMove,
        checkForWin,
        checkForTie,
        switchPlayer
    };
})();

// Start the game
Gameplay.startGame();
