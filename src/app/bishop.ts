import { Piece } from './piece';

export class Bishop extends Piece {
    type = 'Bishop';
    possibleMoves: { move: number[], validate: Function, blockers: number[][] }[] = [
        { move: [1, 1], validate: this.canMove, blockers: [] },
        { move: [2, 2], validate: this.canMove, blockers: [[1, 1]] },
        { move: [3, 3], validate: this.canMove, blockers: [[1, 1], [2, 2]] },
        { move: [4, 4], validate: this.canMove, blockers: [[1, 1], [2, 2], [3, 3]] },
        { move: [5, 5], validate: this.canMove, blockers: [[1, 1], [2, 2], [3, 3], [4, 4]] },
        { move: [6, 6], validate: this.canMove, blockers: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]] },
        { move: [7, 7], validate: this.canMove, blockers: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]] },
        { move: [1, -1], validate: this.canMove, blockers: [] },
        { move: [2, -2], validate: this.canMove, blockers: [[1, -1]] },
        { move: [3, -3], validate: this.canMove, blockers: [[1, -1], [2, -2]] },
        { move: [4, -4], validate: this.canMove, blockers: [[1, -1], [2, -2], [3, -3]] },
        { move: [5, -5], validate: this.canMove, blockers: [[1, -1], [2, -2], [3, -3], [4, -4]] },
        { move: [6, -6], validate: this.canMove, blockers: [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5]] },
        { move: [7, -7], validate: this.canMove, blockers: [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6]] },
        { move: [-1, 1], validate: this.canMove, blockers: [] },
        { move: [-2, 2], validate: this.canMove, blockers: [[-1, 1]] },
        { move: [-3, 3], validate: this.canMove, blockers: [[-1, 1], [-2, 2]] },
        { move: [-4, 4], validate: this.canMove, blockers: [[-1, 1], [-2, 2], [-3, 3]] },
        { move: [-5, 5], validate: this.canMove, blockers: [[-1, 1], [-2, 2], [-3, 3], [-4, 4]] },
        { move: [-6, 6], validate: this.canMove, blockers: [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5]] },
        { move: [-7, 7], validate: this.canMove, blockers: [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6]] },
        { move: [-1, -1], validate: this.canMove, blockers: [] },
        { move: [-2, -2], validate: this.canMove, blockers: [[-1, -1]] },
        { move: [-3, -3], validate: this.canMove, blockers: [[-1, -1], [-2, -2]] },
        { move: [-4, -4], validate: this.canMove, blockers: [[-1, -1], [-2, -2], [-3, -3]] },
        { move: [-5, -5], validate: this.canMove, blockers: [[-1, -1], [-2, -2], [-3, -3], [-4, -4]] },
        { move: [-6, -6], validate: this.canMove, blockers: [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5]] },
        { move: [-7, -7], validate: this.canMove, blockers: [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6]] }
    ];
}
