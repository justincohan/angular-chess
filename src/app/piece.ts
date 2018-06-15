import { Square } from './square';
import { GameComponent } from './game/game.component';

export enum Side {
    BLACK = 'black',
    WHITE = 'white'
}

export abstract class Piece {
    type: string;
    side: string;
    game: GameComponent;
    firstMove: boolean;
    possibleMoves: { move: number[], validate: Function, blockers: number[][] }[];

    constructor(side: string, game: GameComponent) {
        this.side = side;
        this.firstMove = true;
        this.game = game;
    }

    validMove(board: Square[][], square: Square, targetSquare: Square): boolean {
        const move = [targetSquare.x, targetSquare.y];
        for (const validMove of this.getValidMoves(board, square)) {
            if (this.isEqual(move, validMove)) {
                return true;
            }
        }
        return false;
    }

    isEqual(move1: Number[], move2: Number[]): boolean {
        for (const index in [0, 1]) {
            if (move1[index] !== move2[index]) {
                return false;
            }
        }
        return true;
    }

    getValidMoves(board: Square[][], square: Square): number[][] {
        const validMoves = [];

        for (const possibleMove of this.possibleMoves) {
            const targetX = square.x + possibleMove.move[0];
            const targetY = square.y + possibleMove.move[1];
            if (this.outOfBounds(targetX, targetY)) {
                continue;
            }
            const targetSquare = board[targetX][targetY];
            if (this.isBlocked(board, square, possibleMove.blockers)) {
                continue;
            }
            if (!possibleMove.validate(targetSquare)) {
                continue;
            }
            validMoves.push([targetX, targetY]);
        }
        return validMoves;
    }

    canMove = (targetSquare: Square): boolean => {
        return !targetSquare.piece || targetSquare.piece.side !== this.side;
    }

    move(targetSquare: Square): void {
        this.firstMove = false;
    }

    isBlocked(board: Square[][], square: Square, blockers: number[][]): boolean {
        for (const blocker of blockers) {
            const targetX = square.x + blocker[0];
            const targetY = square.y + blocker[1];
            if (this.outOfBounds(targetX, targetY)) {
                continue;
            } else if (board[targetX][targetY].piece) {
                return true;
            }
        }
        return false;
    }

    outOfBounds(taregtX: number, targetY: number): boolean {
        if (taregtX < 0 || taregtX >= 8) {
            return true;
        }
        if (targetY < 0 || targetY >= 8) {
            return true;
        }
        return false;
    }
}
