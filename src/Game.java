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
      Pair p1 = getInput(1);
      Pair p2 = getInput(2);
      gameBoard.executeTurn(p1, p2);
      gameBoard.printBoard();
    }
  }

  private Pair getInput(int player) {
    System.out.println("Player " + player + "'s Move: ");
    int row = getRowInput();
    int col = getColInput();
    Pair move = new Pair(row, col);
    if (!gameBoard.isValidCell(move, player)) {
      System.out.println("Invalid cell!");
      return getInput(player);
    }
    return move;
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
