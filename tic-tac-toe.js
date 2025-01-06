function createPlayer(isTurn, marker) {
    return {
      isTurn,
      marker,
      toggleTurn: function() {
        this.isTurn = !this.isTurn;
      }
    };
}

const Gameboard = (function() {
    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    function placeMarker(index, marker) {
        // Check IF the index is valid (within the bounds of the board array)
        if(index >=0 && index <= 8) {
            // put isSpotAvailable here?
            if (isSpotAvailable(index)) {
                // Place marker in this spot
                board[index] = marker;
            }
            return 1;
        }
        return 0
    }

    function clearBoard() {
        board.fill(' ');  
    }

    function getBoardState() {
        return board;
    }

    function isSpotAvailable(index) {
        return board[index] === ' ';
    }

    return {
        // methods
        getBoardState,
        placeMarker,
        isSpotAvailable,
        clearBoard
    }
})();

const GameController = (function() {
    let players = [];
    const gameBoard = Gameboard;
    
    function isSpotEmpty(spot) {
        return spot === ' ';
    }
    
    function checkRowForWin(rowStartIndex) {
        const boardState = gameBoard.getBoardState();
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
      gameBoard.clearBoard();

      console.log('GAME STARTO')

      const firstPlayer = players.find(player => player.isTurn)
      console.log(`${firstPlayer.marker} Will go first`)

    };
  
    const checkForWinner = function() {
        let board = Gameboard.getBoardState();

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
        if (!board.includes(' ')) return 'draw';

        return false;
    };

    const playRound = function(index) {
        let whosTurn = players.find((element) => element.isTurn);
        let board = Gameboard.getBoardState();
    
        if (Gameboard.isSpotAvailable(index)) {
            Gameboard.placeMarker(index, whosTurn.marker);
    
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
console.log(Gameboard.getBoardState());
GameController.playRound(4);
console.log(gameResult);
console.log(Gameboard.getBoardState());