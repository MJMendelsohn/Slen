import java.util.ArrayList;
import java.util.Arrays;

public final class Board {
  private State[][] board;
  
  public Board(int width, int height) {
    // num columns = width, num rows = height
    this.board = new State[width][height];
    for(State[] column : board) {
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
  
  public void executeTurn(Pair p1, Pair p2) {
    // the initial placement phase may be calculated sequentially
    setCell(p1, State.BLACK);
    setCell(p2, State.WHITE);

    // capturing logic requires simultaneity
    // calculate all vertical and horizontal segments and compare endpoints to see if rectangles form
    ArrayList<Pair> vertBlackPairs = new ArrayList<Pair>();
    ArrayList<Pair> horizBlackPairs = new ArrayList<Pair>();
    ArrayList<Pair> vertWhitePairs = new ArrayList<Pair>();
    ArrayList<Pair> horizWhitePairs = new ArrayList<Pair>();
  }

  /**
   * A method to find the pairs for both players in a given direction. This method could be replaced with a less
   * intuitive but more efficient method which would only need to be called once and which would find vertical and
   * horizontal pairs simultaneously, but this should be good enough for now.
   * @param isVert Whether or not the method should find vertical pairs. If the method does not seek vertical pairs it
   *               will find horizontal ones.
   * @return An array containing two ArrayLists of Pairs, the first for black and the second for white.
   */
  private ArrayList<Pair>[] getPairsInDirection(boolean isVert) {
    int innerBound = isVert ? board.length : board[0].length;
    int outerBound = isVert ? board[0].length : board.length;
    for (int i = 0; i < innerBound; i++) {
      ArrayList<Integer> blackPiecesFound = new ArrayList<Integer>();
      ArrayList<Integer> whitePiecesFound = new ArrayList<Integer>();
      for (int j = 0; i < outerBound; j++) {
//        if(board[i][j] == 1) {
//
//        }
      }
    }
    return null;
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
      for(int x = 0; x < board[0].length; x++) {
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
        return '.';
      case BLACK:
        return 'B';
      case WHITE:
        return 'W';
      case BOTH:
        return 'X';
    }
    return '?';
  }

  public boolean isValidRow(int row) {
    return row >= 0 && row < board.length;
  }

  public boolean isValidCol(int col) {
    return col >= 0 && col < board[0].length;
  }
}
