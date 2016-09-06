public final class Board {
  private int[][] board;
  
  public Board(int rows, int cols) {
    this.board = new int[rows][cols];
  }

  public void setCell(int row, int col, int val) {
    board[row][col] = val;
  }

  public void printBoard() {
    for(int i = 0; i < board.length; i++) {
      for(int j = 0; j < board[i].length; j++) {
        System.out.print(board[i][j] + " ");
      }
      System.out.println();
    }
  }
}
