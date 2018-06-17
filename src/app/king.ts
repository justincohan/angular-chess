import { Piece } from './piece';
import { Square } from './square';
import { GameComponent } from './game/game.component';
import { Move } from './move';


export class King extends Piece {
    type = 'King';

    constructor(side: string, game: GameComponent) {
        super(side, game);
        this.possibleMoves = [
            new Move([1, 0], this.canMove, this.applyMove, []),
            new Move([1, 1], this.canMove, this.applyMove, []),
            new Move([1, -1], this.canMove, this.applyMove, []),
            new Move([0, 1], this.canMove, this.applyMove, []),
            new Move([0, -1], this.canMove, this.applyMove, []),
            new Move([-1, 0], this.canMove, this.applyMove, []),
            new Move([-1, 1], this.canMove, this.applyMove, []),
            new Move([-1, -1], this.canMove, this.applyMove, []),
            new Move([0, -2], this.canCastle, this.applyCastleLeft, [[0, -1], [0, -2], [0, -3]]),
            new Move([0, 2], this.canCastle, this.applyCastleRight, [[0, 1], [0, 2]]),
        ];
    }

    applyCastleLeft = (selectedQuare: Square, targetSquare: Square): void => {
        // When the king moves move the castle as well
        this.applyMove(selectedQuare, targetSquare);
        this.game.movePieceToTarget(this.board[targetSquare.x][0], this.board[targetSquare.x][3]);
    }

    applyCastleRight = (selectedQuare: Square, targetSquare: Square): void => {
        // When the king moves move the castle as well
        this.applyMove(selectedQuare, targetSquare);
        this.game.movePieceToTarget(this.board[targetSquare.x][7], this.board[targetSquare.x][5]);
    }

    isBlocked(square: Square, blockers: number[][]): boolean {
        // Make sure king doesn't castle through check
        if (super.isBlocked(square, blockers)) {
            return true;
        }
        for (const blocker of blockers) {
            // Only check when the king is the selected piece.  Can the king safely castle?
            if (this.game.selectedSquare && this.game.selectedSquare.piece === this &&
                !this.game.kingIsSafe(square, this.getSquare(square, blocker))) {
                return true;
            }
        }

        return false;
    }

    canCastle = (targetSquare: Square): boolean => {
        // Is this the first move for the king and the target rook? The king must not be in check.
        let rookSquare;
        if (!this.firstMove || this.game.inCheck) {
            return false;
        }
        if (targetSquare.y === 6) {  // Right Castle
            rookSquare = this.board[targetSquare.x][targetSquare.y + 1];
        } else if (targetSquare.y === 2) { // Left Castle
            rookSquare = this.board[targetSquare.x][targetSquare.y - 2];
        }
        return rookSquare.piece && rookSquare.piece.firstMove;
    }

}
