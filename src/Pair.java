/**
 * Created by Jacob on 9/5/2016.
 */
public class Pair {
    private int x;
    private int y;

    public Pair(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }
    public int getY() {
        return y;
    }

    public boolean equals(Object o) {
        if (!(o instanceof Pair)) {
            return false;
        } else {
            Pair p = (Pair) o;
            return (x == p.getX()) && (y == p.getY());
        }
    }
}
