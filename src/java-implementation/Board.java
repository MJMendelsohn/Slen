import java.util.*;

public final class Board {
  private State[][] board;
  private State[][] terrBoard;
  
  public Board(int width, int height) {
    // num columns = width, num rows = height
    this.board = new State[width][height];
    for(State[] column : board) {
      Arrays.fill(column, State.NEITHER);
    }
    this.terrBoard = new State[width][height];
    for(State[] column : terrBoard) {
      Arrays.fill(column, State.NEITHER);
    }
  }

  public State setCell(Pair loc, State val) {
    if (!(val == State.BLACK || val == State.WHITE) || !isValidCell(loc, val)) {
      throw new RuntimeException("Tried to set invalid cell");
    }
    if(board[loc.getX()][loc.getY()] != State.NEITHER) {
      board[loc.getX()][loc.getY()] = State.BOTH;
    } else {
      board[loc.getX()][loc.getY()] = val;
    }
    return board[loc.getX()][loc.getY()];
  }

  // TODO re-apply capture logic to account for cascading captures
  public void executeTurn(Pair p1, Pair p2) {
    // the initial placement phase may be calculated sequentially
    setCell(p1, State.BLACK);
    setCell(p2, State.WHITE);
    while(!iterateCaptures()) {}
  }

  /**
   * Applies one recursive iteration of captures. Returns false if no captures were made, and thus that no further
   * capture checks need be made.
   */
  public boolean iterateCaptures(){
    // capturing logic requires simultaneity, so we process column by column
    boolean noMoreCaptures = true;
    /**
     * Maps for each color from a given interval to the column it appears in. Will only ever need one entry since if a
     * second pair is found, scoring would occur which will reset the map entry with the new segment.
     */
    Map<Pair, Integer> blackSegmentColumns = new HashMap<Pair, Integer>();
    Map<Pair, Integer> whiteSegmentColumns = new HashMap<Pair, Integer>();
    /**
     * Sets for each color containing the vertical segments of the currently examined column, where the pairs represent
     * interval endpoints.
     */
    Set<Pair> currentBlackSegments = new HashSet<Pair>();
    Set<Pair> currentWhiteSegments = new HashSet<Pair>();
    /**
     * Sets for each color containing the points found so far in the currently examined column
     */
    Set<Integer> currentBlackPoints = new HashSet<Integer>();
    Set<Integer> currentWhitePoints = new HashSet<Integer>();

    HashSet<Pair> toRemove = new HashSet<Pair>(); // placeholder set to prevent a ConcurrentModificationException
    for(int x = 0; x < board.length; x++) {
      // Populates the current segments sets.
      currentBlackSegments.clear();
      currentWhiteSegments.clear();
      currentBlackPoints.clear();
      currentWhitePoints.clear();
      for(int y = 0; y < board[0].length; y++) {
        // first add any new segments that use the new point to account for shared vertices
        if (board[x][y] == State.BLACK || board[x][y] == State.BOTH) {
          for(Integer i : currentBlackPoints) {
            currentBlackSegments.add(new Pair(i, y));
          }
        }
        if (board[x][y] == State.WHITE || board[x][y] == State.BOTH) {
          for(Integer i : currentWhitePoints) {
            currentWhiteSegments.add(new Pair(i, y));
          }
        }
        // then remove previous points which are blocked by the new point of an opposing color
        if (board[x][y] == State.BLACK || board[x][y] == State.BOTH) {
          currentWhitePoints.clear();
        }
        if (board[x][y] == State.WHITE || board[x][y] == State.BOTH) {
          currentBlackPoints.clear();
        }
        // finally, add the new points no matter what since they can't have been blocked yet
        if (board[x][y] == State.BLACK || board[x][y] == State.BOTH) {
          currentBlackPoints.add(y);
        }
        if (board[x][y] == State.WHITE || board[x][y] == State.BOTH) {
          currentWhitePoints.add(y);
        }
      }

      // Searches for parallel pairs in pair map and scores accordingly.
      Set<Pair> blackCapturedTerr = new HashSet();
      for(Pair p : currentBlackSegments) {
        if(blackSegmentColumns.containsKey(p) && x - blackSegmentColumns.get(p) > 1) { // quick fix until we have cap states
          noMoreCaptures = false;
          for(int i = blackSegmentColumns.get(p); i <= x; i++){
            for(int j = p.getX(); j <= p.getY(); j++){
              Pair captured = new Pair(i, j);
              if(isCapturableTerritory(captured)) {
                blackCapturedTerr.add(captured);
              }
            }
          }
        }
      }
      Set<Pair> whiteCapturedTerr = new HashSet();
      for(Pair p : currentWhiteSegments) {
        if(whiteSegmentColumns.containsKey(p) && x - whiteSegmentColumns.get(p) > 1) { // quick fix until we have cap states
          noMoreCaptures = false;
          for(int i = whiteSegmentColumns.get(p); i <= x; i++){
            for(int j = p.getX(); j <= p.getY(); j++){
              Pair captured = new Pair(i, j);
              if(isCapturableTerritory(captured)) {
                whiteCapturedTerr.add(captured);
              }
            }
          }
        }
      }

      updateTerritory(blackCapturedTerr, whiteCapturedTerr);

      // Removes any pairs blocked by things in the current row.
      for(int i : currentBlackPoints) {
        for(Pair p : whiteSegmentColumns.keySet()) {
          if(p.getX() == i || p.getY() == i) {
            toRemove.add(p);
          }
        }
      }
      for(Pair p : toRemove) {
        whiteSegmentColumns.remove(p);
      }
      toRemove.clear();
      for(int i : currentWhitePoints) {
        for(Pair p : blackSegmentColumns.keySet()) {
          if(p.getX() == i || p.getY() == i) {
            toRemove.add(p);
          }
        }
      }
      for(Pair p : toRemove) {
        blackSegmentColumns.remove(p);
      }
      toRemove.clear();

      // Adds newly found segments to the columns maps.
      for(Pair p : currentBlackSegments) {
        blackSegmentColumns.put(p, x);
      }
      for(Pair p : currentWhiteSegments) {
        whiteSegmentColumns.put(p, x);
      }
    }
    return noMoreCaptures;
  }

  public void printBoard() {
    System.out.print("   ");
    for(int i = 0; i < board.length; i++) {
      String label = (i < 10 ? " " + i : "" + i);
      System.out.print(" " + label);
    }
    System.out.println();
    System.out.print("   ");
    for(int i = 0; i < board.length; i++) {
      System.out.print("---");
    }
    System.out.println();
    for(int y = 0; y < board[0].length; y++) {
      String label = (y < 10 ? " " + y : "" + y);
      System.out.print(label + " | ");
      for(int x = 0; x < board.length; x++) {
        System.out.print(getDisplayValue(x, y) + "  ");
      }
      System.out.println();
    }
  }

  public boolean isValidCell(Pair loc , State player) {
    State val = board[loc.getX()][loc.getY()];
    return val != State.BOTH && val != player;
  }

  /**
   * A method to abstract away the choice of what to display for a given cell state.
   * @param x
   * @param y
   * @return The display value of the given board cell.
   */
  public char getDisplayValue(int x, int y) {
    switch(board[x][y]) {
      case NEITHER:
        return getTerrDisplayValue(x, y);
      case BLACK:
        return 'B';
      case WHITE:
        return 'W';
      case BOTH:
        return 'X';
    }
    return '?';
  }

  private char getTerrDisplayValue(int x, int y) {
    System.out.println("X: " + x + ", Y: " + y);
    switch(terrBoard[x][y]) {
      case NEITHER:
        return '.';
      case BLACK:
        return '-';
      case WHITE:
        return '|';
      case BOTH:
        return '+';
    }
    return '?';
  }

  public boolean isValidRow(int row) {
    return row >= 0 && row < board[0].length;
  }

  public boolean isValidCol(int col) {
    return col >= 0 && col < board.length;
  }

  private boolean isCapturableTerritory(Pair loc) {
    if (!isValidRow(loc.getY()) || !isValidCol(loc.getX())) {
      throw new RuntimeException("Location is not on territory board");
    }
    return terrBoard[loc.getY()][loc.getX()] == State.NEITHER;
  }

  private void updateTerritory(Set<Pair> blackCapturedTerr, Set<Pair> whiteCapturedTerr) {
    for (Pair p: blackCapturedTerr) {
      setTerrCell(p, State.BLACK);
    }
    for (Pair p: whiteCapturedTerr) {
      if (terrBoard[p.getX()][p.getY()] == State.BLACK) {
        setTerrCell(p, State.BOTH);
      } else {
        setTerrCell(p, State.WHITE);
      }
    }
  }

  private void setTerrCell(Pair pair, State val) {
    if (!isValidRow(pair.getY()) || !isValidCol(pair.getX())) {
      throw new RuntimeException("Location is not on territory board");
    }
    terrBoard[pair.getX()][pair.getY()] = val;
  }
}
