import React from 'react';
import ReactDOM from 'react-dom';
import { GameData } from './game_data';
import { Action } from './action';
//TODO add type protection to the stateless functional components.

/**
 * The object used to manage the game view. The View contains React components
 * which draw the game state when View.update is called, and sends user inputs
 * to the Model.
 * @param data The GameData object for a given game.
 */
export function View(data) {
    this.data = data;
    this.root = document.getElementById('react-container');
}

/**
 * The method used to attach the Model update callback function to the View.
 */
View.prototype.init = function(modelCallback) {
    this.modelCallback = modelCallback;
    this.update();
};

/**
 * The method used to re-render the View based on the value of this.data.
 */
View.prototype.update = function() {
    ReactDOM.render(React.createElement(Board,
        {board: this.data.getBoardData(), modelCallback: this.modelCallback}),
        this.root);
};

let Board = function(props) {
    return React.createElement('table', {style: {borderCollapse: 'collapse'}},
        React.createElement(BoardBody, props));
};

Board.propTypes = {
    board: React.PropTypes.instanceOf(GameData.BoardData).isRequired,
    modelCallback: React.PropTypes.func.isRequired
}

let BoardBody = function(props) {
    var rows = [];
    for (var i = 0; i < props.board.getSize(); i++) {
        var childProps = {row: props.board.getRow(i), y: i, modelCallback: props.modelCallback};
        rows[i] = React.createElement(BoardRow, childProps);
    }
    return React.createElement.apply(this, ['tbody', props].concat(rows));
};

BoardBody.propTypes = {
    board: React.PropTypes.instanceOf(GameData.BoardData).isRequired,
    modelCallback: React.PropTypes.func.isRequired
}

let BoardRow = function(props) {
    var cells = [];
    for (var i = 0; i < props.row.length; i++) {
        var childProps = {cell: props.row[i], y: props.y, x: i, modelCallback: props.modelCallback};
        cells[i] = React.createElement(BoardCell, childProps);
    }
    return React.createElement.apply(this, ['tr', props].concat(cells));
};

BoardRow.propTypes = {
    row: React.PropTypes.arrayOf(GameData.BoardData.LocationData).isRequired,
    modelCallback: React.PropTypes.func.isRequired
}

let BoardCell = function(props) {
    return React.createElement('td',
        {onClick: function place() {props.modelCallback.apply(this, [new Action('place',
        {x: props.x, y: props.y})])},
        style: {border: '1px solid #000000', textAlign:'center',
        padding: '0px', width:20, height:20}},
        View.getCellSymbol(props.cell));
};

BoardCell.propTypes = {
    cell: React.PropTypes.instanceOf(GameData.BoardData.LocationData).isRequired,
    modelCallback: React.PropTypes.func.isRequired
}

/**
 * The method used to select what to display for a given LocationData.
 */
View.getCellSymbol = function(cell) {
    if (!cell.hasBlackPiece && !cell.hasWhitePiece &&
        !cell.hasBlackMark && !cell.hasWhiteMark) {
        return ' ';
    } else if (cell.hasBlackPiece && !cell.hasWhitePiece) {
        return 'B';
    } else if (!cell.hasBlackPiece && cell.hasWhitePiece) {
        return 'W';
    } else if (cell.hasBlackMark && !cell.hasWhiteMark) {
        return 'b';
    } else if (!cell.hasBlackMark && cell.hasWhiteMark) {
        return 'w';
    } else if (cell.hasBlackMark && cell.hasWhiteMark){
        return 'x';
    } else {
        return 'X';
    }
};
