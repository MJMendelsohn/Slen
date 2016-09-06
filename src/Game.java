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
      Pair p1 = getInput(State.BLACK);
      Pair p2 = getInput(State.WHITE);
      gameBoard.executeTurn(p1, p2);
      gameBoard.printBoard();
    }
  }

  private Pair getInput(State player) {
    System.out.println("Player " + player + "'s Move: ");
    int y = getRowInput();
    int x = getColInput();
    if (!gameBoard.isValidCell(new Pair(x, y), player)) {
      System.out.println("Invalid cell!");
      return getInput(player);
    }
    return new Pair(x, y);
  }

  private int getRowInput() {
    System.out.print("Enter Row: ");
    try {
      int row = scanner.nextInt();
      if (!gameBoard.isValidRow(row)) {
        System.out.println("Invalid row input!");
        return getRowInput();
      }
      return row;
    } catch(RuntimeException e) {
      System.out.println("Invalid row input!");
      scanner.nextLine();
      return getRowInput();
    }
  }

  private int getColInput() {
    System.out.print("Enter Col: ");
    try {
      int col = scanner.nextInt();
      if (!gameBoard.isValidCol(col)) {
        System.out.println("Invalid column input!");
        return getColInput();
      }
      return col;
    } catch(RuntimeException e) {
      System.out.println("Invalid column input!");
      scanner.nextLine();
      return getColInput();
    }
  }
}
