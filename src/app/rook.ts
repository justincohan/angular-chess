import { Piece } from './piece';
import { Move } from './move';

export class Rook extends Piece {
    type = 'Rook';
    possibleMoves: Move[] = [
        new Move([1, 0], this.canMove, this.applyMove, []),
        new Move([2, 0], this.canMove, this.applyMove, [[1, 0]]),
        new Move([3, 0], this.canMove, this.applyMove, [[1, 0], [2, 0]]),
        new Move([4, 0], this.canMove, this.applyMove, [[1, 0], [2, 0], [3, 0]]),
        new Move([5, 0], this.canMove, this.applyMove, [[1, 0], [2, 0], [3, 0], [4, 0]]),
        new Move([6, 0], this.canMove, this.applyMove, [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0]]),
        new Move([7, 0], this.canMove, this.applyMove, [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]]),
        new Move([-1, 0], this.canMove, this.applyMove, []),
        new Move([-2, 0], this.canMove, this.applyMove, [[-1, 0]]),
        new Move([-3, 0], this.canMove, this.applyMove, [[-1, 0], [-2, 0]]),
        new Move([-4, 0], this.canMove, this.applyMove, [[-1, 0], [-2, 0], [-3, 0]]),
        new Move([-5, 0], this.canMove, this.applyMove, [[-1, 0], [-2, 0], [-3, 0], [-4, 0]]),
        new Move([-6, 0], this.canMove, this.applyMove, [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0]]),
        new Move([-7, 0], this.canMove, this.applyMove, [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0]]),
        new Move([0, 1], this.canMove, this.applyMove, []),
        new Move([0, 2], this.canMove, this.applyMove, [[0, 1]]),
        new Move([0, 3], this.canMove, this.applyMove, [[0, 1], [0, 2]]),
        new Move([0, 4], this.canMove, this.applyMove, [[0, 1], [0, 2], [0, 3]]),
        new Move([0, 5], this.canMove, this.applyMove, [[0, 1], [0, 2], [0, 3], [0, 4]]),
        new Move([0, 6], this.canMove, this.applyMove, [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]]),
        new Move([0, 7], this.canMove, this.applyMove, [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]]),
        new Move([0, -1], this.canMove, this.applyMove, []),
        new Move([0, -2], this.canMove, this.applyMove, [[0, -1]]),
        new Move([0, -3], this.canMove, this.applyMove, [[0, -1], [0, -2]]),
        new Move([0, -4], this.canMove, this.applyMove, [[0, -1], [0, -2], [0, -3]]),
        new Move([0, -5], this.canMove, this.applyMove, [[0, -1], [0, -2], [0, -3], [0, -4]]),
        new Move([0, -6], this.canMove, this.applyMove, [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5]]),
        new Move([0, -7], this.canMove, this.applyMove, [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6]])
    ];

}
