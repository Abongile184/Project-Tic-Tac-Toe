// this part controls the behavior of the ui for every selection made
const UIController = () => {
    const wrapperContainer = document.getElementById("wrapper");
    const humanBtn = document.getElementById("human-btn");
    const computerBtn = document.getElementById("ai-btn");
    const primaryContainer = document.getElementById("primary-container");
    const secondaryContainer = document.getElementById("secondary-container");
    const board = document.getElementById("board");
    const winningMessage = document.getElementById("winningMessage");
    const startGameBtn = document.getElementById("start-game-btn");
    const player1NameDisplay = document.querySelector(".player_indicator-one");
    const player2NameDisplay = document.querySelector(".player_indicator-two");
    const form = document.getElementById("form");
    const resetGame = document.querySelector(".restartButton");

    const initialize = () => {
        humanBtn.addEventListener("click", showForm);
        startGameBtn.addEventListener("click", beginGame);
        CellController().initializeCells();
        resetGame.addEventListener("click", restartGame);
        computerBtn.addEventListener("click", computer);
    };

    //this is to make sure that once a selection is made a user interface hides and the next one shows 
    const showForm = () => {
        primaryContainer.style.display = "none";
        wrapperContainer.style.display = "none";
        board.style.display = "none";
        winningMessage.style.display = "none";
        secondaryContainer.style.display = "block";
    };

    //once a user has filled in the player's one and two, validate the form and submit the values 
    const beginGame = (event) => {
        event.preventDefault();
        const playerOneName = document.getElementById("name1").value.trim();
        const playerTwoName = document.getElementById("name2").value.trim();
        const playerOneSign = document.getElementById("sign1").value.trim().toUpperCase();
        const playerTwoSign = document.getElementById("sign2").value.trim().toUpperCase();

        if (!playerOneName || !playerTwoName || !playerOneSign || !playerTwoSign) {
            alert("Please fill in the required details below to proceed!");
        } else {
            player1NameDisplay.textContent = `PLAYER ONE: ${playerOneName}`;
            player2NameDisplay.textContent = `${playerTwoName} :TWO PLAYER`;
            secondaryContainer.style.display = "none";
            board.style.display = "grid";
            initializePlayers(playerOneName, playerOneSign, playerTwoName, playerTwoSign);
            Gameplay.startGame();
        }
    };

    //to ensure that a grid / cell is only clicked once 
    const CellController = () => {
        const cellElements = document.querySelectorAll("[data-cell]");

        const initializeCells = () => {
            cellElements.forEach((cell, index) => {
                cell.addEventListener("click", () => handleClick(index), { once: true });
            });
        };

        const handleClick = (index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            Gameplay.makeMove(row, col);
        };

        return {
            initializeCells,
        };
    };

    return {
        initialize,
    };
};

const restartGame = () => {
    window.location.reload();
};

const computer = () => {
    alert("currently under construction stay tuned!");
}

document.addEventListener("DOMContentLoaded", () => {
    const uiController = UIController();
    uiController.initialize();
});

