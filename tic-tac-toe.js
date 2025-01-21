function createPlayer(isTurn, marker) {
    return {
        isTurn,
        marker,
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

    const startGame = function () {
        players = [
            createPlayer(true, 'X'),
            createPlayer(false, 'O')
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
                (`${whosTurn.marker} has won the game!`);
                return 'win'; // You can return a string or boolean to signify game end
            } else if (gameResult === 'draw') {
                ("We have reached an impass!");
                return 'draw';
            } else {
                // No win or draw, switch turns
                players.forEach(player => player.toggleTurn());
                return 'continue';
            }
        } else {
            ("That spot is already taken!");
            return 'invalid';
        }
    };

    return {
        startGame,
        playRound
    };
})();

const DisplayController = (function () {
    const boardDiv = document.querySelector('.board');
    const starButton = document.querySelector('.start-game');
    const buttons = [];
    
    function clearBoard() {
        boardDiv.textContent = '';
    }
    
    function updateDisplay() {
        const currentBoardState = gameBoard.getBoard();
        currentBoardState.forEach((marker, index) => {
            buttons[index].textContent = marker;
        });
    }

    function generateNewBoard() {
        gameBoard.getBoard().forEach((_, i) => {
            const boardSpot = document.createElement('button');
            boardSpot.classList.add('spot');``
            boardDiv.appendChild(boardSpot);
            buttons.push(boardSpot);
    
            boardSpot.addEventListener('click', function () {
                const result = GameController.playRound(i);
                if(result === 'win' || result === 'draw') {
                    buttons.forEach(button => {
                        button.disabled = true;
                    })
                }
                updateDisplay()
            })
            
            boardSpot.setAttribute('aria-label', `position ${i}`);
        })
    }
    
    
    starButton.addEventListener('click', function() {
        clearBoard();
        this.textContent = 'Restart'
        GameController.startGame();
        generateNewBoard();
    })

})();

// (gameBoard.getBoard());

// GameController.playRound(4)
// GameController.playRound(0);
// GameController.playRound(3);
// GameController.playRound(1);
// GameController.playRound(5);

// const board = gameBoard.getBoard();

// const displayBoard = board.reduce((display, cell, i) => {
//     cell = cell || ' ';  // Replace empty string with space
//     if (i % 3 === 2) return display + cell + '\n---------\n';
//     return display + cell + ' | ';`
// }, '');
// (displayBoard);