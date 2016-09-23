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
        return React.createElement('table',
            {style: {borderCollapse: 'collapse'}}, React.createElement.apply(
            this, ['tbody', null].concat(rows)));
    }
});

GameState.BoardState.BoardCell = React.createClass({
    displayName: "BoardCell",

    getInitialState: function getInitialState() {
        return {value: 'B'}
    },
    
    handleClick() {
        if (this.state.value == 'B') {
            this.setState({value: 'W'});
        } else {
            this.setState({value: 'B'});
        }
    },

    render: function render() {
        return React.createElement(
            'td',
            {onClick: this.handleClick, style: {border: '1px solid #000000', textAlign:'center', padding: '0px', width:20, height:20}},
            this.state.value)
    }
});