/**
 * The object used to store all of the data in the game. This object has no 
 * functions besides functions used to abstract away data structures, and all
 * of its properties recursively have no functions besides functions used to
 * abstract away data structures.
 * @param gameParameters The GameParameters object used to construct the game.
 */
function GameData(gameParameters) {
    this.board = new GameData.BoardData()
    this.metaData = new GameData.MetaData();
}

GameData.prototype.getBoardData = function() {
    return this.board;
};

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
    this.rows = new Array(GameParameters.size);
    for (var y = 0; y < GameParameters.size; y++) {
        this.rows[y] = new Array(GameParameters.size);
        for(var x = 0; x < GameParameters.size; x++) {
            this.rows[y][x] = new GameData.BoardData.LocationData();
        }
    }
}

GameData.BoardData.prototype.getRow = function(y) {
    return this.rows[y];
};

GameData.BoardData.prototype.getLocationData = function(x, y) {
    return this.rows[y][x];
};

GameData.BoardData.prototype.getSize = function() {
    return this.rows.length;
};

/**
 * An object managing the collection of PieceData and TerritoryMarkData objects
 * on a given location on the game board.
 */
GameData.BoardData.LocationData = function() {
    this.hasBlackPiece = false;
    this.hasWhitePiece = false;
    this.hasBlackMark = false;
    this.hasWhiteMark = false;
}

GameData.BoardData.LocationData.prototype.addPiece = function(color) {
    if (color == State.BLACK) {
        this.hasBlackPiece = true;
    } else {
        this.hasWhitePiece = true;
    }
};

GameData.BoardData.LocationData.prototype.addTerritoryMark = function(color) {
    if (color == State.BLACK) {
        this.hasBlackMark = true;
    } else {
        this.hasWhiteMark = true;
    }
};