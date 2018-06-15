import { Piece } from './piece';
import { Square } from './square';
import { GameComponent } from './game/game.component';

export class King extends Piece {
    type = 'King';

    constructor(side: string, game: GameComponent) {
        super(side, game);
        this.possibleMoves = [
            { move: [1, 0], validate: this.canMove, blockers: [] },
            { move: [1, 1], validate: this.canMove, blockers: [] },
            { move: [1, -1], validate: this.canMove, blockers: [] },
            { move: [0, 1], validate: this.canMove, blockers: [] },
            { move: [0, -1], validate: this.canMove, blockers: [] },
            { move: [-1, 0], validate: this.canMove, blockers: [] },
            { move: [-1, 1], validate: this.canMove, blockers: [] },
            { move: [-1, -1], validate: this.canMove, blockers: [] },
            { move: [0, -2], validate: this.canCastle, blockers: [[0, -1], [0, -2], [0, -3]] },
            { move: [0, 2], validate: this.canCastle, blockers: [[0, 1], [0, 2]] },
        ];
    }

    move(targetSquare: Square): void {
        // When the king moves move the castle as well
        if (this.firstMove) {
            if (targetSquare.y === 6) {
                this.game.moveCurrentToTarget(this.game.board[targetSquare.x][7], this.game.board[targetSquare.x][5]);
            } else if (targetSquare.y === 2) {
                this.game.moveCurrentToTarget(this.game.board[targetSquare.x][0], this.game.board[targetSquare.x][3]);
            }
        }
        super.move(targetSquare);
    }

    isBlocked(board: Square[][], square: Square, blockers: number[][]): boolean {
        // Make sure king doesn't castle through check
        if (super.isBlocked(board, square, blockers)) {
            return true;
        }
        for (const blocker of blockers) {
            const targetX = square.x + blocker[0];
            const targetY = square.y + blocker[1];
            // Only check when the king is the selected piece.  Can the king safely castle?
            if (this.game.selectedSquare.piece === this && !this.game.validMove(square, board[targetX][targetY])) {
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
            rookSquare = this.game.board[targetSquare.x][targetSquare.y + 1];
        } else if (targetSquare.y === 2) { // Left Castle
            rookSquare = this.game.board[targetSquare.x][targetSquare.y - 2];
        }
        return rookSquare.piece && rookSquare.piece.firstMove;
    }

}
