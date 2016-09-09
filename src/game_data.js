/**
 * The object used to store all of the data in the game. This object has no 
 * functions besides functions used to abstract away data structures, and all
 * of its properties recursively have no functions used to abstract away data
 * structures.
 * @param size The integer size of the board.
 */
function GameData(size) {
    this.board = new BoardData(size)
    this.metaData = new MetaData();
}

/**
 * The object used to store all of the metadata in the game i.e. anything that
 * the model doesn't need to look at in order to carry out the game logic but
 * which might be interesting or useful to the user.
 */
function MetaData() {
    this.turn = 0; // the current turn of the game
}

/**
 * An object storing a two-dimensional array of LocationData
 */
function BoardData(size) {
    this.xIndices = new Array(size);
    for (var x = 0; x < size; x++) {
        this.xIndices[x] = new Array(size);
    }
}