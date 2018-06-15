import { Piece } from './piece';

export class Rook extends Piece {
    type = 'Rook';
    possibleMoves: { move: number[], validate: Function, blockers: number[][] }[] = [
        { move: [1, 0], validate: this.canMove, blockers: [] },
        { move: [2, 0], validate: this.canMove, blockers: [[1, 0]] },
        { move: [3, 0], validate: this.canMove, blockers: [[1, 0], [2, 0]] },
        { move: [4, 0], validate: this.canMove, blockers: [[1, 0], [2, 0], [3, 0]] },
        { move: [5, 0], validate: this.canMove, blockers: [[1, 0], [2, 0], [3, 0], [4, 0]] },
        { move: [6, 0], validate: this.canMove, blockers: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0]] },
        { move: [7, 0], validate: this.canMove, blockers: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]] },
        { move: [-1, 0], validate: this.canMove, blockers: [] },
        { move: [-2, 0], validate: this.canMove, blockers: [[-1, 0]] },
        { move: [-3, 0], validate: this.canMove, blockers: [[-1, 0], [-2, 0]] },
        { move: [-4, 0], validate: this.canMove, blockers: [[-1, 0], [-2, 0], [-3, 0]] },
        { move: [-5, 0], validate: this.canMove, blockers: [[-1, 0], [-2, 0], [-3, 0], [-4, 0]] },
        { move: [-6, 0], validate: this.canMove, blockers: [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0]] },
        { move: [-7, 0], validate: this.canMove, blockers: [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0]] },
        { move: [0, 1], validate: this.canMove, blockers: [] },
        { move: [0, 2], validate: this.canMove, blockers: [[0, 1]] },
        { move: [0, 3], validate: this.canMove, blockers: [[0, 1], [0, 2]] },
        { move: [0, 4], validate: this.canMove, blockers: [[0, 1], [0, 2], [0, 3]] },
        { move: [0, 5], validate: this.canMove, blockers: [[0, 1], [0, 2], [0, 3], [0, 4]] },
        { move: [0, 6], validate: this.canMove, blockers: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]] },
        { move: [0, 7], validate: this.canMove, blockers: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]] },
        { move: [0, -1], validate: this.canMove, blockers: [] },
        { move: [0, -2], validate: this.canMove, blockers: [[0, -1]] },
        { move: [0, -3], validate: this.canMove, blockers: [[0, -1], [0, -2]] },
        { move: [0, -4], validate: this.canMove, blockers: [[0, -1], [0, -2], [0, -3]] },
        { move: [0, -5], validate: this.canMove, blockers: [[0, -1], [0, -2], [0, -3], [0, -4]] },
        { move: [0, -6], validate: this.canMove, blockers: [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5]] },
        { move: [0, -7], validate: this.canMove, blockers: [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6]] }
    ];

}
