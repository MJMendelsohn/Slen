/**
 * The object used to manage the game logic. The Model and its subobjects are
 * allowed to view and modify the GameData object. The model updates the game
 * when Model.update is called.
 * @param data The GameData object for a given game.
 */
function Model(data) {
    this.gameData = data;
    this.currentColor = State.BLACK;
}

/**
 * The method used to attach the View update callback function to the Model.
 */
Model.prototype.init = function(viewCallback) {
    this.viewCallback = viewCallback;
};

/**
 * The method used to issue Actions to the model.
 * @param action The given Action for the Model to execute.
 */
Model.prototype.update = function(command) {
    if(command.id == 'place') {
        if (this.place(command.contents.x, command.contents.y, this.currentColor)) {
            if (this.currentColor == State.BLACK) {
                this.currentColor = State.WHITE;
            } else {
                this.currentColor = State.BLACK;
            }
        }
    }
    this.viewCallback.apply(this, [this.gameData]);
};

Model.prototype.place = function(x, y, value) {
    if(this.gameData.getBoardData().getLocationData(x, y).hasWhitePiece && value == State.WHITE ||
        this.gameData.getBoardData().getLocationData(x, y).hasBlackPiece && value == State.BLACK) {
            return false;
    }
    this.gameData.getBoardData().getLocationData(x, y).addPiece(value);
    return true;
};