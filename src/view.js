
function View(gameData) {
    this.gameData = gameData;
    this.board = this.gameData.board;

    this.rootElement = React.createElement('div', null);
    ReactDOM.render(React.createElement(GameState, null),
    document.getElementById('react-container'));
}

GameState = React.createClass({
    displayName: "Game",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(GameState.BoardState, null)
        )
    }
});

GameState.BoardState = React.createClass({
    displayName: "Board",

    render: function render() {
        var cols = [];
        for (var i = 0; i < GameData.gameParameters.size; i++) {
            cols[i] = React.createElement(GameState.BoardState.BoardColumn,
            {key: i});
        }
        return React.createElement.apply(this, ['div', null].concat(cols));
    }
});

GameState.BoardState.BoardColumn = React.createClass({
    displayName: "BoardColumn",

    render: function render() {
        var cells = [];
        for (var i = 0; i < GameData.gameParameters.size; i++) {
            cells[i] = React.createElement(GameState.BoardState.BoardColumn.BoardCell,
            {key: i});
        }
        return React.createElement.apply(this, ['div', null].concat(cells));
    }
});

GameState.BoardState.BoardColumn.BoardCell = React.createClass({
    displayName: "BoardCell",

    render: function render() {
        return React.createElement(
            "div",
            null,
            "X"
        )
    }
});