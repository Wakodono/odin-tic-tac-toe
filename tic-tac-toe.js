const Gameboard = (function() {
    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    function getBoardState() {
        return board;
    }
    return {
        // methods
        getBoardState,
        placeMarker,
        isSpotAvailable
    }
})();