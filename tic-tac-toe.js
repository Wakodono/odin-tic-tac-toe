function createPlayer(isTurn, marker, playerName) {
    return {
        isTurn,
        marker,
        playerName,
        wins: 0,
        toggleTurn: function () {
            this.isTurn = !this.isTurn;
        }
    };
}

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;

    const placeMarker = (index, symbol) => {
        if (index >= 0 && index < board.length && isSpotAvailable(index)) {
            board[index] = symbol;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };

    const isSpotAvailable = (index) => {
        return board[index] === '';
    };

    return { getBoard, placeMarker, resetBoard, isSpotAvailable };
})();

const GameController = (function () {
    let players = [];
    let boardState = gameBoard.getBoard();

    const startGame = function (player1Name, player2Name) {
        players = [
            createPlayer(true, 'X', player1Name),
            createPlayer(false, 'O', player2Name)
        ];

        gameBoard.resetBoard();

        ('GAME STARTO');

        const firstPlayer = players.find(player => player.isTurn);

        (`${firstPlayer.marker} Will go first`);
    };


    function isSpotEmpty(spot) {
        return spot === '';
    }

    function checkForWin(board) {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningLines.some(line => {
            const firstSpot = board[line[0]];
            return !isSpotEmpty(firstSpot) &&
                line.every(index => board[index] === firstSpot);
        });
    }

    const checkForWinner = function () {
        const board = gameBoard.getBoard();
        return checkForWin(board) || (!board.includes('') && 'draw') || false;
    };

    const playRound = function (index) {
        const whosTurn = players.find((element) => element.isTurn);
        const board = gameBoard

        if (board.isSpotAvailable(index)) {
            board.placeMarker(index, whosTurn.marker);

            let gameResult = checkForWinner();

            if (gameResult === true) {
                whosTurn.wins += 1;
                console.log(`${whosTurn.playerName} has won the game!`);
                return 'win'; // You can return a string or boolean to signify game end
            } else if (gameResult === 'draw') {
                console.log("We have reached an impass!");
                return 'draw';
            } else {
                // No win or draw, switch turns
                players.forEach(player => player.toggleTurn());
                return 'continue';
            }
        } else {
            console.log("That spot is already taken!");
            return 'invalid';
        }
    };

    return {
        startGame,
        playRound
    };
})();

const DisplayController = (function () {
    const mainContainer = document.querySelector('main');
    const boardDiv = document.querySelector('.board');
    const form = document.querySelector('form');
    const buttons = [];

    let player1Name;
    let player2Name;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        player1Name = this.player1.value;
        player2Name = this.player2.value;

        if (player1Name && player2Name) {
            form.style.display = 'none';

            generateStartButton();
        }
    })


    function clearBoard() {
        boardDiv.innerHTML = '';
        buttons.length = 0;
        gameBoard.resetBoard();
    }

    function updateDisplay() {
        const currentBoardState = gameBoard.getBoard();
        currentBoardState.forEach((marker, index) => {
            buttons[index].textContent = marker;
        });
    }

    function generateNewBoard() {
        if (buttons.length === 0) {
            gameBoard.getBoard().forEach((_, i) => {
                const boardSpot = document.createElement('button');
                boardSpot.classList.add('spot');
                boardDiv.appendChild(boardSpot);
                buttons.push(boardSpot);

                boardSpot.addEventListener('click', function () {
                    const result = GameController.playRound(i);
                    if (result === 'win' || result === 'draw') {
                        buttons.forEach(button => {
                            button.disabled = true;
                        })
                    }
                    updateDisplay()
                })

                boardSpot.setAttribute('aria-label', `position ${i}`);
            })
        }
    }

    // Generate start button when player names have been entered
    function generateStartButton() {
        // create element
        const starButton = document.createElement('button');

        // add to classlist
        starButton.classList.add('start-game');

        starButton.textContent = 'Start';

        // append element to parent
        mainContainer.appendChild(starButton);

        starButton.addEventListener('click', function () {
            if (this.textContent === 'Start') {
                // First game start
                this.textContent = 'Restart';
                GameController.startGame(player1Name, player2Name);
                generateNewBoard();
            } else {
                // Restart game
                clearBoard();
                GameController.startGame(player1Name, player2Name);
                generateNewBoard();
            }
        });
    }

})();