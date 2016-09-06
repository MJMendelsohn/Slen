public final class Board {
  private int[][] board;
  
  public Board(int rows, int cols) {
    this.board = new int[rows][cols];
  }

  public int setCell(int row, int col, int val) {
    if (!(val == 1 || val == 2) || !isValidCell(row, col, val)) {
      throw new RuntimeException("Tried to set invalid cell");
    } 
    board[row][col] += val;
    return board[row][col];
  }
  
  public void executeTurn(int rowP1, int colP1, int rowP2, int colP2) {
    setCell(rowP1, colP1, 1);
    setCell(rowP2, colP2, 2);
  }

  public void printBoard() {
    for(int i = 0; i < board.length; i++) {
      for(int j = 0; j < board[i].length; j++) {
        System.out.print(board[i][j] + " ");
      }
      System.out.println();
    }
  }

  public boolean isValidCell(int row, int col, int val) {
    int currVal = board[row][col];
    return currVal != 3 && currVal != val;
  }

  public boolean isValidRow(int row) {
    return row >= 0 && row < board.length;
  }

  public boolean isValidCol(int col) {
    return col >= 0 && col < board[0].length;
  }
}
