/**
 * The object used to manage the game logic. The Model and its subobjects are
 * allowed to view and modify the GameData object.
 * @param gameData The GameData object for a given game.
 */
function Model(gameData) {
    this.gameData = gameData;
    this.board = this.gameData.board;
}