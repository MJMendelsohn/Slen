public final class Board {
  private int[][] board;
  
  public Board(int rows, int cols) {
    this.board = new int[rows][cols];
  }

  public void setCell(Pair pair, int val) {
    board[pair.getX()][pair.getY()] = val;
  }
  
  public void executeTurn(Pair p1, Pair p2) {
    // the initial placement phase may be calculated sequentially
    if (p1.getX() == p1.getY() && p2.getX() == p2.getY()) {
      setCell(p1, 3);
    } else {
      setCell(p1, 1);
      setCell(p2, 2);
    }

    // capturing logic requires simultaneity
    // calculate all vertical and horizontal segments and compare endpoints to see if rectangles form

  }

  public void printBoard() {
    for(int i = 0; i < board.length; i++) {
      for(int j = 0; j < board[i].length; j++) {
        System.out.print(board[i][j] + " ");
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
