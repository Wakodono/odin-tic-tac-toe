const Gameboard = (function() {
    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    function placeMarker(index, marker) {
        // method logic
    }

    function getBoardState() {
        return board;
    }

    return {
        // methods
        getBoardState,
        placeMarker,
        // isSpotAvailable
    }
})();

console.log(Gameboard.getBoardState());