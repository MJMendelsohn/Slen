public final class Board {
  private int[][] board;
  
  public Board(int rows, int cols) {
    this.board = new int[rows][cols];
  }

  public int setCell(Pair loc, int val) {
    if (!(val == 1 || val == 2) || !isValidCell(loc, val)) {
      throw new RuntimeException("Tried to set invalid cell");
    }
    board[loc.getX()][loc.getY()] += val;
    return board[loc.getX()][loc.getY()];
  }
  
  public void executeTurn(Pair p1, Pair p2) {
    // the initial placement phase may be calculated sequentially
    setCell(p1, 1);
    setCell(p2, 2);

    // capturing logic requires simultaneity
    // calculate all vertical and horizontal segments and compare endpoints to see if rectangles form
  }

  public void printBoard() {
    System.out.print("   ");
    for(int i = 0; i < board[0].length; i++) {
      String label = (i < 10 ? " " + i : ""+i);
      System.out.print(" " + label);
    }
    System.out.println();
    System.out.print("   ");
    for(int i = 0; i < board[0].length; i++) {
      System.out.print("---");
    }
    System.out.println();
    for(int i = 0; i < board.length; i++) {
      String label = (i < 10 ? " " + i : ""+i);
      System.out.print(label + " | ");
      for(int j = 0; j < board[i].length; j++) {
        System.out.print(board[i][j] + "  ");
      }
      System.out.println();
    }
  }

  public boolean isValidCell(Pair loc ,int player) {
    int val = board[loc.getX()][loc.getY()];
    return val != 3 && val != player;
  }

  public boolean isValidRow(int row) {
    return row >= 0 && row < board.length;
  }

  public boolean isValidCol(int col) {
    return col >= 0 && col < board[0].length;
  }
}
