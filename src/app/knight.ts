import { Piece } from './piece';
import { Move } from './move';

export class Knight extends Piece {
    type = 'Knight';
    possibleMoves: Move[] = [
        new Move([2, 1], this.canMove, this.applyMove, []),
        new Move([2, -1], this.canMove, this.applyMove, []),
        new Move([1, 2], this.canMove, this.applyMove, []),
        new Move([1, -2], this.canMove, this.applyMove, []),
        new Move([-2, 1], this.canMove, this.applyMove, []),
        new Move([-2, -1], this.canMove, this.applyMove, []),
        new Move([-1, 2], this.canMove, this.applyMove, []),
        new Move([-1, -2], this.canMove, this.applyMove, [])
    ];

}
