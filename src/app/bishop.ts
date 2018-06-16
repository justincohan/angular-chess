import { Piece } from './piece';
import { Move } from './move';

export class Bishop extends Piece {
    type = 'Bishop';
    possibleMoves: Move[] = [
        new Move([1, 1], this.canMove, this.applyMove, []),
        new Move([2, 2], this.canMove, this.applyMove, [[1, 1]]),
        new Move([3, 3], this.canMove, this.applyMove, [[1, 1], [2, 2]]),
        new Move([4, 4], this.canMove, this.applyMove, [[1, 1], [2, 2], [3, 3]]),
        new Move([5, 5], this.canMove, this.applyMove, [[1, 1], [2, 2], [3, 3], [4, 4]]),
        new Move([6, 6], this.canMove, this.applyMove, [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]),
        new Move([7, 7], this.canMove, this.applyMove, [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]]),
        new Move([1, -1], this.canMove, this.applyMove, []),
        new Move([2, -2], this.canMove, this.applyMove, [[1, -1]]),
        new Move([3, -3], this.canMove, this.applyMove, [[1, -1], [2, -2]]),
        new Move([4, -4], this.canMove, this.applyMove, [[1, -1], [2, -2], [3, -3]]),
        new Move([5, -5], this.canMove, this.applyMove, [[1, -1], [2, -2], [3, -3], [4, -4]]),
        new Move([6, -6], this.canMove, this.applyMove, [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5]]),
        new Move([7, -7], this.canMove, this.applyMove, [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6]]),
        new Move([-1, 1], this.canMove, this.applyMove, []),
        new Move([-2, 2], this.canMove, this.applyMove, [[-1, 1]]),
        new Move([-3, 3], this.canMove, this.applyMove, [[-1, 1], [-2, 2]]),
        new Move([-4, 4], this.canMove, this.applyMove, [[-1, 1], [-2, 2], [-3, 3]]),
        new Move([-5, 5], this.canMove, this.applyMove, [[-1, 1], [-2, 2], [-3, 3], [-4, 4]]),
        new Move([-6, 6], this.canMove, this.applyMove, [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5]]),
        new Move([-7, 7], this.canMove, this.applyMove, [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6]]),
        new Move([-1, -1], this.canMove, this.applyMove, []),
        new Move([-2, -2], this.canMove, this.applyMove, [[-1, -1]]),
        new Move([-3, -3], this.canMove, this.applyMove, [[-1, -1], [-2, -2]]),
        new Move([-4, -4], this.canMove, this.applyMove, [[-1, -1], [-2, -2], [-3, -3]]),
        new Move([-5, -5], this.canMove, this.applyMove, [[-1, -1], [-2, -2], [-3, -3], [-4, -4]]),
        new Move([-6, -6], this.canMove, this.applyMove, [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5]]),
        new Move([-7, -7], this.canMove, this.applyMove, [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6]])
    ];
}
