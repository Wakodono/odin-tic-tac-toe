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
  
    const startGame = function() {
      players = [
        createPlayer(true, 'X'),
        createPlayer(false, 'O')
      ];
      // Additional game start logic here
    };
  
    // More game control methods...
    const checkWinner = function() {

        function isSpotEmpty(spot) {
            return spot !== ' ';
        }

        function checkRowForWin(rowStartIndex) {
            const row = board.slice(rowStartIndex, rowStartIndex + 3);
            const firstSpot = row[0];

            return !isSpotEmpty(firstSpot) && row.every(spot => spot === firstSpot);
        }

        function checkColumnForWin(columnStartIndex) {}
        function checkDiagonalForWin(StartIndex) {}

        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            if (checkRowForWin(rowIndex * 3)) {
                return true;
            }
            
        }

        return false;
    };

    const playRound = function(index) {
        let whosTurn = players.find((element) => element.isTurn);
        let board = Gameboard.getBoardState();

        if (Gameboard.isSpotAvailable(index)) {
            // placeMarker
            Gameboard.placeMarker(index, whosTurn.marker);
            if (checkWinner) {
                // Game over - handle win or draw
            } else {
                // Switch turns
            }
        }
    };
  
    return {
      startGame
    };
})();

console.log(Gameboard.placeMarker(0, 'X'));
console.log(Gameboard.getBoardState());