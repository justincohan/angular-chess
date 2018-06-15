import { Component, OnInit } from '@angular/core';

import { Side } from '../piece';
import { Piece } from '../piece';
import { Rook } from '../rook';
import { Bishop } from '../bishop';
import { Knight } from '../knight';
import { Queen } from '../queen';
import { King } from '../king';
import { Pawn } from '../pawn';
import { Square } from '../square';

import { GameService } from '../game.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const PIECESETUP = [[Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook],
[Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn],
[, , , , , , , ],
[, , , , , , , ],
[, , , , , , , ],
[, , , , , , , ],
[Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn],
[Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]];

const SIDE = [Side.BLACK, Side.BLACK, , , , , Side.WHITE, Side.WHITE];

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    board: Square[][] = [];
    selectedSquare: Square;
    player: Side = Side.WHITE;
    message = 'Welcome';
    inCheck = false;
    holdPieces: { targetSquarePiece: Piece, currentSquarePiece: Piece };

    constructor(private gameService: GameService) { }

    ngOnInit() {
        // Initialize our game board
        let isGray = true;
        for (let i = 0; i < 8; i += 1) {
            const row: Square[] = [];
            isGray = !isGray;
            for (let j = 0; j < 8; j += 1) {
                const piece = PIECESETUP[i][j];
                if (piece) {
                    row.push(new Square(isGray, i, j, new (PIECESETUP[i][j])(SIDE[i], this)));
                } else {
                    row.push(new Square(isGray, i, j, undefined));
                }
                isGray = !isGray;
            }
            this.board.push(row);
        }
    }

    findKingSquare(board: Square[][]): Square {
        // Find the king square for the current player
        for (const row of board) {
            for (const square of row) {
                if (square.piece && square.piece.type === 'King' && square.piece.side === this.player) {
                    return square;
                }
            }
        }
    }

    savePieces(currentSquare: Square, targetSquare: Square): void {
        this.holdPieces = { targetSquarePiece: targetSquare.piece, currentSquarePiece: currentSquare.piece };
    }

    restorePieces(currentSquare: Square, targetSquare: Square): void {
        targetSquare.piece = this.holdPieces.targetSquarePiece;
        currentSquare.piece = this.holdPieces.currentSquarePiece;
    }

    moveCurrentToTarget(currentSquare: Square, targetSquare: Square): void {
        targetSquare.piece = currentSquare.piece;
        currentSquare.piece = null;
    }

    validMove(currentSquare: Square, targetSquare: Square): boolean {
        // Check if after this move is completed are any pieces able to take the king.  You should not be able to put yourself in check
        this.savePieces(currentSquare, targetSquare);
        this.moveCurrentToTarget(currentSquare, targetSquare);
        const kingSquare = this.findKingSquare(this.board);

        if (this.isCheck(this.board)) {
            this.restorePieces(currentSquare, targetSquare);
            return false;
        }
        this.restorePieces(currentSquare, targetSquare);
        return true;
    }

    isCheck(board: Square[][]): boolean {
        // Is the king in check on the provided board
        const kingSquare = this.findKingSquare(board);
        for (const row of board) {
            for (const square of row) {
                if (square.piece && square.piece.side !== this.player && square.piece.validMove(board, square, kingSquare)) {
                    return true;
                }
            }
        }
        return false;
    }

    isCheckmate(): boolean {
        for (const row of this.board) {
            for (const square of row) {
                if (square.piece && square.piece.side === this.player) {
                    const validMoves = square.piece.getValidMoves(this.board, square);
                    for (const validMove of validMoves) {
                        if (this.validMove(square, this.board[validMove[0]][validMove[1]])) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    unselectTarget(): void {
        if (this.selectedSquare) {
            this.selectedSquare.unselect();
            this.selectedSquare = null;
        }
    }

    selectTargetSquare(targetSquare: Square): void {
        if (targetSquare.piece && targetSquare.piece.side === this.player) {
            this.unselectTarget();
            targetSquare.select();
            this.selectedSquare = targetSquare;
        }
    }

    movePiece(targetSquare: Square): void {
        // Handle selecting a piece and moving it if the move is valid
        if (this.selectedSquare) {
            if (this.selectedSquare.piece.validMove(this.board, this.selectedSquare, targetSquare) &&
                this.validMove(this.selectedSquare, targetSquare)) {
                this.selectedSquare.piece.move(targetSquare);
                this.moveCurrentToTarget(this.selectedSquare, targetSquare);
                this.player = this.player === Side.WHITE ? Side.BLACK : Side.WHITE;
                this.message = this.player + '\'s turn';
                if (this.isCheck(this.board)) {
                    if (this.isCheckmate()) {
                        this.message = this.player === Side.WHITE ? Side.BLACK : Side.WHITE + ' wins';
                    }
                    this.inCheck = true;
                } else {
                    this.inCheck = false;
                }
                this.unselectTarget();
            } else {
                this.selectTargetSquare(targetSquare);
            }
        } else {
            this.selectTargetSquare(targetSquare);
        }
    }

}
