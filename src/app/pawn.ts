import { Piece } from './piece';
import { Side } from './piece';
import { Square } from './square';
import { GameComponent } from './game/game.component';
import { Move } from './move';
import { Queen } from './queen';


export class Pawn extends Piece {
    type = 'Pawn';

    constructor(side: string, game: GameComponent) {
        super(side, game);
        if (this.side === Side.BLACK) {
            this.possibleMoves = [
            new Move([1, 0], this.canMove, this.maybePromoteBlack, [[1, 0]]),
            new Move([1, 1], this.canTake, this.maybePromoteBlack, []),
            new Move([1, -1], this.canTake, this.maybePromoteBlack, []),
            new Move([1, 1], this.canEnPassant, this.applyEnPassant, []),
            new Move([1, -1], this.canEnPassant, this.applyEnPassant, []),
            new Move([2, 0], this.canMoveTwo, this.applyMoveTwoBlack, [[1, 0], [2, 0]])];
        } else {
            this.possibleMoves = [
            new Move([-1, 0], this.canMove, this.maybePromoteWhite, [[-1, 0]]),
            new Move([-1, 1], this.canTake, this.maybePromoteWhite, []),
            new Move([-1, -1], this.canTake, this.maybePromoteWhite, []),
            new Move([-1, 1], this.canEnPassant, this.applyEnPassant, []),
            new Move([-1, -1], this.canEnPassant, this.applyEnPassant, []),
            new Move([-2, 0], this.canMoveTwo, this.applyMoveTwoWhite, [[-1, 0], [-2, 0]])];
        }
    }

    maybePromoteBlack = (selectedSquare: Square, targetSquare: Square): void => {
        this.applyMove(selectedSquare, targetSquare);
        if (targetSquare.x === 7) {
            targetSquare.piece = new Queen(this.side, this.game);
        }
    }

    maybePromoteWhite = (selectedSquare: Square, targetSquare: Square): void => {
        this.applyMove(selectedSquare, targetSquare);
        if (targetSquare.x === 0) {
            targetSquare.piece = new Queen(this.side, this.game);
        }
    }

    applyMoveTwoBlack = (selectedSquare: Square, targetSquare: Square): void => {
        // Keep track of the pawns who just moved two
        this.applyMove(selectedSquare, targetSquare);
        this.game.enPassant.targetSquare = this.board[targetSquare.x - 1][targetSquare.y];
        this.game.enPassant.pawnSquare = this.board[targetSquare.x][targetSquare.y];
    }

    applyMoveTwoWhite = (selectedQuare: Square, targetSquare: Square): void => {
        // Keep track of the pawns who just moved two
        this.applyMove(selectedQuare, targetSquare);
        this.game.enPassant.targetSquare = this.board[targetSquare.x + 1][targetSquare.y];
        this.game.enPassant.pawnSquare = this.board[targetSquare.x][targetSquare.y];
    }

    applyEnPassant = (selectedQuare: Square, targetSquare: Square): void => {
        // Remove the pawn being passed
        this.game.removePiece(this.game.enPassant.pawnSquare);
        this.applyMove(selectedQuare, targetSquare);
    }

    canMoveTwo = (targetSquare: Square): boolean => {
        // Can move two on first move
        return Boolean(this.firstMove);
    }

    canTake = (targetSquare: Square): boolean => {
        // Can take if there is an enemy piece
        return targetSquare.piece && targetSquare.piece.side !== this.side;
    }

    canEnPassant = (targetSquare: Square): boolean => {
        // Can take if the previous move was a pawn moving two and the target square is the same column as that pawn
        return this.game.enPassant.targetSquare && this.isEqual([this.game.enPassant.targetSquare.x, this.game.enPassant.targetSquare.y],
            [targetSquare.x, targetSquare.y]);
    }

}
