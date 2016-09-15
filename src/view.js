/**
 * The object used to visually render the game state. The View and its
 * subobjects are allowed to view, but not modify the GameData object.
 * @param gameData The GameData object for a given game.
 */
function View(gameData) {
    this.gameData = gameData;
    this.board = this.gameData.board;
    this.display();
}

View.prototype.display = function() {
    var data = {
        title: "Constructing HTML Elements"
    }
    var template = [
        '<div class="tutorial">',
            '<h1 class="tutorial-heading">{{title}}<h1>',
        '</div>'
    ].join("\n");

    var html = Mustache.render(template, data);
    $("body").append(html);
};