const Gameboard = (function() {
    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    function placeMarker(index, marker) {
        // Check IF the index is valid (within the bounds of the board array)
        if(index >=0 && index <= 8) {
            // put isSpotAvailable here?
            if (isSpotAvailable(index)) {
                // Place marker in this spot
            }
        }

        // Check if the spot is available (you can use isSpotAvailable for this if it's implemented).

        // If valid && available, place the marker at the specified index
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

console.log(Gameboard.getBoardState());