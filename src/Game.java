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
      System.out.println("Player 1's Move: ");
      System.out.print("Enter Row: ");
      int rowP1 = scanner.nextInt();
      System.out.print("Enter Column: ");
      int colP1 = scanner.nextInt();
      System.out.println("Player 2's Move: ");
      System.out.print("Enter Row: ");
      int rowP2 = scanner.nextInt();
      System.out.print("Enter Column: ");
      int colP2 = scanner.nextInt();
      if (rowP1 == rowP2 && colP1 == colP2) {
        gameBoard.setCell(rowP1, colP1, 3);
      } else {
        gameBoard.setCell(rowP1, colP1, 1);
        gameBoard.setCell(rowP2, colP2, 2);
      }

      gameBoard.printBoard();
    }
  }
}
