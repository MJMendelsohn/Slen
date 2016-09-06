import java.util.Scanner;

public final class Game {
  private Board gameBoard;
  private Scanner scanner;

  public Game() {
    this.gameBoard = new Board(13, 13);
    this.scanner = new Scanner(System.in);
  }

  public void runGame() {
    gameBoard.printBoard();
    while(true) {
      int[] p1 = getInput(1);
      int[] p2 = getInput(2);
      gameBoard.executeTurn(p1[0], p1[1], p2[0], p2[1]);
      gameBoard.printBoard();
    }
  }

  private int[] getInput(int player) {
    System.out.println("Player " + player + "'s Move: ");
    int row = getRowInput();
    int col = getColInput();
    if (!gameBoard.isValidCell(row, col, player)) {
      System.out.println("Invalid cell!");
      return getInput(player);
    }
    int[] pair = new int[2];
    pair[0] = row;
    pair[1] = col;
    return pair;
  }

  private int getRowInput() {
    System.out.print("Enter Row: ");
    int row = scanner.nextInt();
    if (!gameBoard.isValidRow(row)) {
      System.out.println("Invalid row input!");
      return getRowInput();
    }
    return row;
  }

  private int getColInput() {
    System.out.print("Enter Col: ");
    int col = scanner.nextInt();
    if (!gameBoard.isValidCol(col)) {
      System.out.println("Invalid column input!");
      return getColInput();
    }
    return col;
  }
}
