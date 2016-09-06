public final class Board {
  private int[][] board;
  
  public Board(int rows, int cols) {
    this.board = new int[rows][cols];
  }

  public void setCell(int row, int col, int val) {
    board[row][col] = val;
  }
  
  public void executeTurn(int rowP1, int colP1, int rowP2, int colP2) {
    // the initial placement phase may be calculated sequentially
    if (rowP1 == rowP2 && colP1 == colP2) {
      setCell(rowP1, colP1, 3);
    } else {
      setCell(rowP1, colP1, 1);
      setCell(rowP2, colP2, 2);
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

  public boolean isValidCell(int row,int col,int player) {
    int val = board[row][col];
    return val != 3 && val != player;
  }

  public boolean isValidRow(int row) {
    return row >= 0 && row < board.length;
  }

  public boolean isValidCol(int col) {
    return col >= 0 && col < board[0].length;
  }
}
