/**
 * The object used to manage the game input. The Listener uses the View to
 * interpret the input, the Model to update the game, and then uses the View
 * again to display the updated board.
 * @param model The Model object for a given game.
 * @param view The View object for a given game.
 */
function Listener(model, view) {
    this.model = model;
    this.view = view;
}