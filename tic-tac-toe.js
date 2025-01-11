function createPlayer(isTurn, marker) {
    return {
      isTurn,
      marker,
      toggleTurn: function() {
        this.isTurn = !this.isTurn;
      }
    };
}

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;

    const setCell = (index, symbol) => {
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

    return { getBoard, setCell, resetBoard, isSpotAvailable };
})();

const GameController = (function() {
    let players = [];
    
    function isSpotEmpty(spot) {
        return spot === '';
    }
    
    function checkRowForWin(rowStartIndex) {
        const boardState = gameBoard.getBoard();
        const row = boardState.slice(rowStartIndex, rowStartIndex + 3);
        const firstSpot = row[0];

        return !isSpotEmpty(firstSpot) && row.every(spot => spot === firstSpot);
    }

    function checkColumnForWin(columnStartIndex) {
        // create a new array for each column the populate that array with the index 3 spaces away from it?
        const column = [board[columnStartIndex], board[columnStartIndex + 3], board[columnStartIndex + 6]]
        const firstSpot = column[0]

        return !isSpotEmpty(firstSpot) && column.every(spot => spot === firstSpot);
    }

    function checkDiagonalForWin(diagonal) {
        const firstSpot = diagonal[0]

        return !isSpotEmpty(firstSpot) && diagonal.every(spot => spot === firstSpot);
    }
  
    const startGame = function() {
      players = [
        createPlayer(true, 'X'),
        createPlayer(false, 'O')
      ];
      // Additional game start logic here
      gameBoard.resetBoard();

      console.log('GAME STARTO')

      const firstPlayer = players.find(player => player.isTurn)
      console.log(`${firstPlayer.marker} Will go first`)

    };
  
    const checkForWinner = function() {
        let board = gameBoard.getBoard();

         // Check for wins in rows
         for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            if (checkRowForWin(rowIndex * 3)) {
                return true;
            }
            
        }

        // Check for wins in columns
        for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
            if (checkColumnForWin(columnIndex)) {
                return true;
            }
        }

        // Check for wins in diagonals

        const topLeftToBottomRight = [board[0], board[4], board[8]];
        const topRightToBottomLeft = [board[2], board[4], board[6]];

        if (checkDiagonalForWin(topLeftToBottomRight || checkDiagonalForWin(topRightToBottomLeft))) return true;

        // Check for draw conditions
        if (!board.includes('')) return 'draw';

        return false;
    };

    const playRound = function(index) {
        let whosTurn = players.find((element) => element.isTurn);
        let board = gameBoard.getBoard();
    
        if (gameBoard.isSpotAvailable(index)) {
            gameBoard.setCell(index, whosTurn.marker);
    
            let gameResult = checkForWinner();

            if (gameResult) {
                console.log(`${whosTurn.marker} has won the game!`);
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

GameController.startGame();
console.log(gameBoard.getBoard());
GameController.playRound(4);
console.log(gameResult);
console.log(gameBoard.getBoard());