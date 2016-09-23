function View() {
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

    getInitialState: function getInitialState() {
        return {size: GameParameters.size}
    },

    render: function render() {
        var rows = [];
        for (var i = 0; i < this.state.size; i++) {
            var cells = [];
            for (var j = 0; j < this.state.size; j++) {
                cells[j] = React.createElement(GameState.BoardState.BoardCell,
                {key: j});
            }
            rows[i] = React.createElement.apply(this,
                ['tr', null].concat(cells), {key: i});
        }
        return React.createElement('table', null, React.createElement.apply(
            this, ['tbody', null].concat(rows)));
    }
});

GameState.BoardState.BoardCell = React.createClass({
    displayName: "BoardCell",

    render: function render() {
        return React.createElement(
            "td",
            null,
            "X"
        )
    }
});