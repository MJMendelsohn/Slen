public final class Board {
  private int[][] board;
  
  public Board(int rows, int cols) {
    this.board = new int[rows][cols];
  }

  public void setCell(int row, int col, int val) {
    board[row][col] = val;
  }
  
  public void executeTurn(int rowP1, int colP1, int rowP2, int colP2) {
    if (rowP1 == rowP2 && colP1 == colP2) {
        setCell(rowP1, colP1, 3);
      } else {
        setCell(rowP1, colP1, 1);
        setCell(rowP2, colP2, 2);
      }  
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
