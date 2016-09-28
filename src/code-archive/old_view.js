/**
 * The object used to visually render the game state. The View and its
 * subobjects are allowed to view, but not modify the GameData object.
 * @param gameData The GameData object for a given game.
 */
function View(gameData) {
    this.gameData = gameData;
    this.board = this.gameData.board;

    // this.rootElement = React.createElement('div', {},
    //     React.createElement('h1',))

    this.display();
}

View.prototype.display = function() {
    // ReactDOM.render(this.rootElement, document.getElementById('react-app')
};