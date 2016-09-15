/**
 * The object used to store all of the data in the game. This object has no 
 * functions besides functions used to abstract away data structures, and all
 * of its properties recursively have no functions besides functions used to
 * abstract away data structures.
 * @param gameParameters The GameParameters object used to construct the game.
 */
function GameData(gameParameters) {
    /**
     * The object for constructors within GameData's namespace to reference to
     * know the parameters for the game being constructed. This has the
     * consequence of preventing the creation of multiple GameDatas
     * simultaneously.
     */
    GameData.gameParameters = gameParameters;
    this.board = new GameData.BoardData()
    this.metaData = new GameData.MetaData();
}

/**
 * @private
 * The object used to store all of the metadata in the game i.e. anything that
 * the model doesn't need to look at in order to carry out the game logic but
 * which might be interesting or useful to the user.
 */
GameData.MetaData = function() {
    this.turn = 0; // the current turn of the game
}

/**
 * An object storing a two-dimensional array of LocationData objects.
 * @param size The integer size of the board.
 */
GameData.BoardData = function() {
    this.xIndices = new Array(GameData.gameParameters.size);
    for (var x = 0; x < GameData.gameParameters.size; x++) {
        this.xIndices[x] = new Array(GameData.gameParameters.size);
    }
}

GameData.BoardData.prototype.getLocationDataXY = function(x, y) {
    return this.xIndices[x][y];
};

/**
 * An object managing the collection of PieceData and TerritoryMarkData objects
 * on a given location on the game board.
 */
GameData.BoardData.LocationData = function() {
    this.pieces = [];
    this.territoryMarks = [];
}

GameData.BoardData.LocationData.prototype.addPiece = function(x, y, color) {
    this.pieces.addPiece(new GameData.BoardData.LocationData.PieceData(color));
    return this.xIndices[x][y];
};

GameData.BoardData.LocationData.prototype.addTerritoryMark = function(x, y) {
    this.pieces.addPiece(new GameData.BoardData.LocationData.TerritoryMark(
        color));
    return this.xIndices[x][y];
};

/**
 * An object representing a Piece of a given color on the game board.
 * @param color The color of the placed Piece.
 */
GameData.BoardData.LocationData.PieceData = function(color) {
    this.color = color;
}

/**
 * An object representing a TerritoryMark of a given color on the game board.
 * @param color The color of the placed TerritoryMark.
 */
GameData.BoardData.LocationData.TerritoryMarkData = function(color) {
    this.color = color;
}