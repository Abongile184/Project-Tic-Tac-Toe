let playerOne, playerTwo;

//STEP ONE: represent the game state using a 2D array  
const Gameboard = (() => {
    let arrayBoard = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    const getBoard = () => arrayBoard;

    const resetBoard = () => {
        arrayBoard = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];
    };

    const updateBoard = (row, col, marker) => {
        if (arrayBoard[row][col] === " ") {
            arrayBoard[row][col] = marker;
            //to place the markers created with css based a a user's turn
            const cell = document.querySelector(`[data-cell]:nth-child(${row * 3 + col + 1})`);
            cell.classList.add(marker === "X" ? "x" : "circle");
        } else {
            console.log("Position already occupied!");
        }
    };

    return { getBoard, resetBoard, updateBoard };
})();

//STEP TWO:create a player factory object  
const Player = (name, marker) => {
    return {
        name,
        marker,
        getName: () => name,
        getMarker: () => marker,
    };
};

//fetch the values from the form and use them into the player object 
const initializePlayers = (name1, sign1, name2, sign2) => {
    playerOne = Player(name1, sign1);
    playerTwo = Player(name2, sign2);
};

//STEP THREE: this is where the logic of the game is 
const Gameplay = (() => {
    let currentPlayer;
    let gameState = "inProgress";

    const winArrays = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const startGame = () => {
        Gameboard.resetBoard();
        currentPlayer = playerOne;
        gameState = "inProgress";
        console.log("Game started!");
    };

    const makeMove = (row, col) => {
        if (gameState !== "inProgress") {
            console.log("Game is not in progress!");
            return;
        }

        Gameboard.updateBoard(row, col, currentPlayer.getMarker());

        if (checkForWin()) {
            gameState = "finished";
            displayWinningMessage(`${currentPlayer.getName()} wins!`);
        } else if (checkForTie()) {
            gameState = "finished";
            displayWinningMessage("It's a tie!");
        } else {
            switchPlayer();
        }
    };

    const checkForWin = () => {
        const board = Gameboard.getBoard().flat();
        return winArrays.some(combination =>
            combination.every(index => board[index] === currentPlayer.getMarker())
        );
    };

    const checkForTie = () => {
        return Gameboard.getBoard().flat().every(cell => cell !== " ");
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        updateTurnDisplay();
    };
    
    const whoseTurnNow = document.getElementById("whoseTurnNow");
    
    const updateTurnDisplay = () => {
        whoseTurnNow.textContent = `${currentPlayer.getName()}'s turn (${currentPlayer.getMarker()})`;
    };

    const displayWinningMessage = (message) => {
        const winningMessage = document.getElementById("winningMessage");
        const messageText = document.querySelector("[data-winning-message-text]");
        const gameResults = document.getElementById("game-results");

       
        messageText.textContent = message;
        gameResults.style.display = "none";
        winningMessage.style.display = "flex";
    };

    return {
        startGame,
        makeMove,
    };
})();