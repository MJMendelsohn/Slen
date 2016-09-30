/**
 * The object used to manage the game logic. The Model and its subobjects are
 * allowed to view and modify the GameData object. The model updates the game
 * when Model.update is called.
 * @param data The GameData object for a given game.
 */
function Model(data) {
    this.gameData = data;
    this.currentColor = State.BLACK;
}

/**
 * The method used to attach the View update callback function to the Model.
 */
Model.prototype.init = function(viewCallback) {
    this.viewCallback = viewCallback;
};

/**
 * The method used to issue Actions to the model.
 * @param action The given Action for the Model to execute.
 */
Model.prototype.update = function(command) {
    if(command.id == 'place') {
        if (this.place(command.contents.x, command.contents.y, this.currentColor)) {
            if (this.currentColor == State.BLACK) {
                this.currentColor = State.WHITE;
            } else {
                this.computeTerritory();
                this.currentColor = State.BLACK;
            }
        }
    }
    this.viewCallback.apply(this, [this.gameData]);
};

Model.prototype.place = function(x, y, value) {
    if(this.gameData.getBoardData().getLocationData(x, y).hasWhitePiece && value == State.WHITE ||
        this.gameData.getBoardData().getLocationData(x, y).hasBlackPiece && value == State.BLACK) {
            return false;
    }
    this.gameData.getBoardData().getLocationData(x, y).addPiece(value);
    return true;
};

Model.prototype.getCell = function(x, y) {
    return this.gameData.getBoardData().getLocationData(x, y);
};

Model.prototype.computeTerritory = function() {
    // capturing logic requires simultaneity, so we process column by column
    var noMoreCaptures = true;
    /**
     * Maps for each color from a given interval to the column it appears in. Will only ever need one entry since if a
     * second pair is found, scoring would occur which will reset the map entry with the new segment.
     */
    blackSegmentColumns = {};
    whiteSegmentColumns = {};
    /**
     * Sets for each color containing the vertical segments of the currently examined column, where the pairs represent
     * interval endpoints.
     */
    currentBlackSegments = {};
    currentWhiteSegments = {};
    /**
     * Sets for each color containing the points found so far in the currently examined column
     */
    currentBlackPoints = {};
    currentWhitePoints = {};

    toRemove = {}; // placeholder set to prevent a ConcurrentModificationException
    for(var x = 0; x < this.gameData.getBoardData().getSize(); x++) {
        // Populates the current segments sets.
        currentBlackSegments = {};
        currentWhiteSegments = {};
        currentBlackPoints = {};
        currentWhitePoints = {};
        for(var y = 0; y < this.gameData.getBoardData().getSize(); y++) {
            // first add any new segments that use the new point to account for shared vertices
            if (this.getCell(x, y).hasBlackPiece) {
                for (var i in currentBlackPoints) {
                    if (!currentBlackPoints.hasOwnProperty(i)) {
                        continue;
                    }
                    var obj = {top: currentBlackPoints[i], bottom: y};
                    currentBlackSegments[JSON.stringify(obj)] = obj; // does this add it like a set entry like I think it does?
                }
            }
            if (this.getCell(x, y).hasWhitePiece) {
                for (var i in currentWhitePoints) {
                    if (!currentWhitePoints.hasOwnProperty(i)) {
                        continue;
                    }
                    var obj = {top: currentWhitePoints[i], bottom: y};
                    currentWhiteSegments[JSON.stringify(obj)] = obj; // does this add it like a set entry like I think it does?
                }
            }
            // then remove previous points which are blocked by the new point of an opposing color
            if (this.getCell(x, y).hasBlackPiece) {
                currentWhitePoints = {};
            }
            if (this.getCell(x, y).hasWhitePiece) {
                currentBlackPoints = {};
            }
            // finally, add the new points no matter what since they can't have been blocked yet
            if (this.getCell(x, y).hasBlackPiece) {
                currentBlackPoints[y] = y;
            }
            if (this.getCell(x, y).hasWhitePiece) {
                currentWhitePoints[y] = y;
            }
        }

        // Searches for parallel pairs in pair map and scores accordingly.
        for(var p in currentBlackSegments) {
            if (!currentBlackSegments.hasOwnProperty(p)) {
                continue;
            }
            if(typeof blackSegmentColumns[p] !== 'undefined' && x - blackSegmentColumns[p].column > 1) { // quick fix until we have cap states
                noMoreCaptures = false;
                var obj = blackSegmentColumns[p];
                for(var i = obj.column; i <= x; i++){
                    for(var j = obj.top; j <= obj.bottom; j++){
                        this.place(i, j, State.BLACK);
                    }
                }
            }
        }
        for(var p in currentWhiteSegments) {
            if (!currentWhiteSegments.hasOwnProperty(p)) {
                continue;
            }
            if(typeof whiteSegmentColumns[p] !== 'undefined' && x - whiteSegmentColumns[p].column > 1) { // quick fix until we have cap states
                noMoreCaptures = false;
                var obj = whiteSegmentColumns[p];
                for(var i = obj.column; i <= x; i++){
                    for(var j = obj.top; j <= obj.bottom; j++){
                        this.place(i, j, State.WHITE);
                    }
                }
            }
        }

        // Removes any pairs blocked by things in the current row.
        for(var i in currentBlackPoints) {
            if (!currentBlackPoints.hasOwnProperty(i)) {
                continue;
            }
            for(var p in whiteSegmentColumns) {
                if (!whiteSegmentColumns.hasOwnProperty(p)) {
                    continue;
                }
                // var obj = JSON.parse(p);
                var obj = whiteSegmentColumns[p];
                console.log(obj);
                if(obj.top == i || obj.bottom == i) {
                    toRemove[p] = obj;
                }
            }
        }
        for(var p in toRemove) {
            if(!toRemove.hasOwnProperty(p)) {
                continue;
            }
            delete whiteSegmentColumns[p];
        }
        toRemove = {};

        for(var i in currentWhitePoints) {
            if (!currentWhitePoints.hasOwnProperty(i)) {
                continue;
            }
            // console.log('HEREEEEE');
            // console.log(currentWhiteSegments);
            for(var p in blackSegmentColumns) {
                // console.log('yee');
                if (!blackSegmentColumns.hasOwnProperty(p)) {
                    continue;
                }
                // var obj = JSON.parse(p);
                var obj = blackSegmentColumns[p];
                // console.log('2' + obj);
                if(obj.top == i || obj.bottom == i) {
                    toRemove[p] = obj;
                }
            }
        }
        for(var p in toRemove) {
            if(!toRemove.hasOwnProperty(p)) {
                continue;
            }
            delete blackSegmentColumns[p];
        }
        // console.log(toRemove);
        toRemove = {};

        // Adds newly found segments to the columns maps.
        for(var p in currentBlackSegments) {
            if (!currentBlackSegments.hasOwnProperty(p)) {
                continue;
            }
            var obj = JSON.parse(p);
            blackSegmentColumns[p] = {top: obj.top, bottom: obj.bottom, column: x};
        }
        for(var p in currentWhiteSegments) {
            if (!currentWhiteSegments.hasOwnProperty(p)) {
                continue;
            }
            var obj = JSON.parse(p);
            whiteSegmentColumns[p] = {top: obj.top, bottom: obj.bottom, column: x};
        }
    }
    return noMoreCaptures;
};
