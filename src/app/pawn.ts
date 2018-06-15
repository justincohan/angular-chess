import { Piece } from './piece';
import { Side } from './piece';
import { Square } from './square';
import { GameComponent } from './game/game.component';


export class Pawn extends Piece {
    type = 'Pawn';

    constructor(side: string, game: GameComponent) {
        super(side, game);
        if (this.side === Side.BLACK) {
            this.possibleMoves = [{ move: [1, 0], validate: this.canMove, blockers: [[1, 0]] },
            { move: [1, 1], validate: this.canTake, blockers: [] },
            { move: [1, -1], validate: this.canTake, blockers: [] },
            { move: [2, 0], validate: this.canMoveTwo, blockers: [[1, 0], [2, 0]] }];
        } else {
            this.possibleMoves = [{ move: [-1, 0], validate: this.canMove, blockers: [[-1, 0]] },
            { move: [-1, 1], validate: this.canTake, blockers: [] },
            { move: [-1, -1], validate: this.canTake, blockers: [] },
            { move: [-2, 0], validate: this.canMoveTwo, blockers: [[-1, 0], [-2, 0]] }];
        }
    }

    canMoveTwo = (targetSquare: Square): boolean => {
        // Can move two on first move
        return Boolean(this.firstMove);
    }

    canTake = (targetSquare: Square): boolean => {
        // Can take if there is an enemy piece
        return targetSquare.piece && targetSquare.piece.side !== this.side;
    }


}
