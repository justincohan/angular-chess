import { Piece } from './piece';

export class Knight extends Piece {
    type = 'Knight';
    possibleMoves: { move: number[], validate: Function, blockers: number[][] }[] = [
        { move: [2, 1], validate: this.canMove, blockers: [] },
        { move: [2, -1], validate: this.canMove, blockers: [] },
        { move: [1, 2], validate: this.canMove, blockers: [] },
        { move: [1, -2], validate: this.canMove, blockers: [] },
        { move: [-2, 1], validate: this.canMove, blockers: [] },
        { move: [-2, -1], validate: this.canMove, blockers: [] },
        { move: [-1, 2], validate: this.canMove, blockers: [] },
        { move: [-1, -2], validate: this.canMove, blockers: [] }
    ];

}
