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
        isSpotAvailable
    }
})();

const GameController = (function() {
    let players = [];
    const Gameboard = Gameboard

    function isSpotEmpty(spot) {
        return spot !== ' ';
    }

    function checkRowForWin(rowStartIndex) {
        const row = board.slice(rowStartIndex, rowStartIndex + 3);
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
    };
  
    // More game control methods...
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
        if (!board.includes(' ')) return 'Draw';

        return false;
    };

    const playRound = function(index) {
        let board = Gameboard.getBoardState();
        let whosTurn = players.find((element) => element.isTurn);

        
    };
  
    return {
      startGame
    };
})();

console.log(Gameboard.placeMarker(0, 'X'));
console.log(Gameboard.getBoardState());