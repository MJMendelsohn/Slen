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
    // function transform ( arr ) {
    //     var result = [], temp = [];
    //     arr.forEach( function ( elem, i ) {
    //         if ( i > 0 && i % 5 === 0 ) {
    //             result.push( temp );
    //             temp = [];
    //         }
    //         temp.push( elem );
    //     });
    //     if ( temp.length > 0 ) {
    //         result.push( temp );
    //     }
    //     return result;
    // }
    $.get('templates.html', function(template) {
        $.tmpl(template, data).appendTo('#whatever');
    });

    $.get("templates.html", function(html) { $(this.el).html(Mustache.render(html, view)) });

    data = this.gameData.board.xIndices;
    console.log($("#gameBoard"));
    $("body").append(Mustache.render($("#gameBoard").html(), data));

    // var data = {
    //     title: "Constructing HTML Elements"
    // }
    // var template = [
    //     '<div class="tutorial">',
    //         '<h1 class="tutorial-heading">{{title}}<h1>',
    //     '</div>'
    // ].join("\n");

    // var html = Mustache.render(template, data);
    // $("body").append(html);
};