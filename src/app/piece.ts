import { Square } from './square';
import { GameComponent } from './game/game.component';
import { Move } from './move';

export enum Side {
    BLACK = 'black',
    WHITE = 'white'
}

export abstract class Piece {
    type: string;
    side: string;
    game: GameComponent;
    board: Square[][];
    firstMove: boolean;
    possibleMoves: Move[];

    constructor(side: string, game: GameComponent) {
        this.side = side;
        this.firstMove = true;
        this.game = game;
        this.board = this.game.board;
    }

    outOfBounds(taregtX: number, targetY: number): boolean {
        // Is this target number on our board?
        if (taregtX < 0 || taregtX >= 8) {
            return true;
        }
        if (targetY < 0 || targetY >= 8) {
            return true;
        }
        return false;
    }

    getSquare(square: Square, move: number[]): Square {
        // Return the square this piece would move to
        const targetX = square.x + move[0];
        const targetY = square.y + move[1];
        if (this.outOfBounds(targetX, targetY)) {
            return null;
        }
        return this.board[targetX][targetY];
    }

    getValidMove(square: Square, targetSquare: Square): Move {
        // Return the applicable Move object for this movement if it is valid
        const moves = this.getMatchingMoves(square, targetSquare);
        for (const move of moves) {
            if (this.isValidMove(square, move)) {
                return move;
            }
        }
        return null;
    }

    isEqual(move1: Number[], move2: Number[]): boolean {
        // Compare if two moves are equal [5, 6] === [5, 6]
        for (const index in [0, 1]) {
            if (move1[index] !== move2[index]) {
                return false;
            }
        }
        return true;
    }

    isValidMove(square: Square, move: Move): boolean {
        // Can the piece legally make this movement
        const targetSquare = this.getSquare(square, move.move);
        if (!targetSquare) { // Outside the board
            return false;
        }
        if (this.isBlocked(square, move.blockers)) { // Another Piece in the way
            return false;
        }
        if (!move.validate(targetSquare)) { // Piece specific validation
            return false;
        }
        return true;
    }

    getMatchingMoves(square: Square, targetSquare: Square) {
        // Return all Move objects that would take a piece from the square to the targetSquare
        const move = [targetSquare.x - square.x, targetSquare.y - square.y];
        const possibleMoves = [];
        for (const possibleMove of this.possibleMoves) {
            if (this.isEqual(move, possibleMove.move)) {
                possibleMoves.push(possibleMove);
            }
        }
        return possibleMoves;
    }

    getValidTargetSquares(square: Square): Square[] {
        // Return all possible target Square for this piece
        const validTargetSquares = [];
        for (const possibleMove of this.possibleMoves) {
            if (this.isValidMove(square, possibleMove)) {
                validTargetSquares.push(this.getSquare(square, possibleMove.move));
            }
        }
        return validTargetSquares;
    }

    canMove = (targetSquare: Square): boolean => {
        // Target square must not contain a piece of the player moving
        return !targetSquare.piece || targetSquare.piece.side !== this.side;
    }

    applyMove = (targetSquare: Square): void  => {
        // When move is confirmerd set some state variables
        this.game.enPassant.pawnSquare = null;
        this.game.enPassant.targetSquare = null;
        this.firstMove = false;
    }

    isBlocked(square: Square, blockers: number[][]): boolean {
        // Is there a piece preventing this piece from moving to it's destination
        for (const blocker of blockers) {
            const targetSquare = this.getSquare(square, blocker);
            if (targetSquare && targetSquare.piece) {
                return true;
            }
        }
        return false;
    }
}
