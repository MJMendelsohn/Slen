import React from 'react';
import GameParameters from './game_parameters';
import GameData from './game_data';

function GameView() {
    this.GameData = new GameData(new GameParameters(11));

    this.GameState = React.createClass({
        displayName: "Game",

        render: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(BoardState, null)
            )
        }
    });

    this.GameState.BoardState = React.createClass({
        displayName: "Board",

        render: function render() {
            var board = this.props.
            return React.createElement(
                "div",
                null,
                "Board to Come!"
            )
        }
    });

    this.GameState.BoardState.BoardColumn = React.createClass({
        displayName: "BoardColumn",

        render: function render() {
            return React.createElement(
                "div",
                null,
                "Board to Come!"
            )
        }
    });

    this.GameState.BoardState.BoardColumn.BoardCell = React.createClass({
        displayName: "BoardCell",

        render: function render() {
            return React.createElement(
                "div",
                null,
                "X"
            )
        }
    });
}
