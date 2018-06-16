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
    enPassant: { pawnSquare: Square, targetSquare: Square} = {pawnSquare: null, targetSquare: null};
    selectedSquare: Square;
    player: Side = Side.WHITE;
    message = 'Welcome';
    inCheck = false;
    holdPieces: { targetSquarePiece: Piece, currentSquarePiece: Piece };

    constructor(private gameService: GameService) { }

    ngOnInit() {
        // Initialize our game board with squares and pieces
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

    findKingSquare(): Square {
        // Find the king square for the current player
        for (const row of this.board) {
            for (const square of row) {
                if (square.piece && square.piece.type === 'King' && square.piece.side === this.player) {
                    return square;
                }
            }
        }
    }

    savePieces(currentSquare: Square, targetSquare: Square): void {
        //  Hold positions to be restored
        this.holdPieces = { targetSquarePiece: targetSquare.piece, currentSquarePiece: currentSquare.piece };
    }

    restorePieces(currentSquare: Square, targetSquare: Square): void {
        // Restore original positions
        targetSquare.piece = this.holdPieces.targetSquarePiece;
        currentSquare.piece = this.holdPieces.currentSquarePiece;
    }

    removePiece(targetSquare: Square): void {
        // Remove this piece.  Used for pawn passing
        targetSquare.piece = null;
    }

    movePieceToTarget(currentSquare: Square, targetSquare: Square): void {
        // complete the move of a piece to the target square
        targetSquare.piece = currentSquare.piece;
        currentSquare.piece = null;
    }

    kingIsSafe(currentSquare: Square, targetSquare: Square): boolean {
        // Check if after this move is completed are any pieces able to take the king.  You should not be able to put yourself in check
        this.savePieces(currentSquare, targetSquare);
        this.movePieceToTarget(currentSquare, targetSquare);
        const kingIsInCheck = this.isCheck();
        this.restorePieces(currentSquare, targetSquare);
        return !kingIsInCheck;
    }

    isCheck(): boolean {
        // Is the king in check on the board
        const kingSquare = this.findKingSquare();
        for (const row of this.board) {
            for (const square of row) {
                if (square.piece && square.piece.side !== this.player && square.piece.getValidMove(square, kingSquare)) {
                    return true;
                }
            }
        }
        return false;
    }

    isCheckmate(): boolean {
        // Is there any possible move where the king won't be in check
        for (const row of this.board) {
            for (const square of row) {
                if (square.piece && square.piece.side === this.player) {
                    const validMoves = square.piece.getValidTargetSquares(square);
                    for (const validMove of validMoves) {
                        // Can this piece make a move that would stop the king from being in check?
                        if (this.kingIsSafe(square, validMove)) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    unselectSquare(): void {
        // Unselect currently selected square
        this.selectedSquare = null;
    }

    selectSquare(targetSquare: Square): void {
        // Mark clicked square as selected if it is a piece for the current player
        if (targetSquare.piece && targetSquare.piece.side === this.player) {
            this.unselectSquare();
            this.selectedSquare = targetSquare;
        }
    }

    switchPlayer(): void {
        this.player = this.player === Side.WHITE ? Side.BLACK : Side.WHITE;
        this.message = this.player + '\'s turn';
    }

    movePiece(targetSquare: Square): void {
        // Handle selecting a piece and moving it
        if (this.selectedSquare) { // If a piece is selected then check if the target is a valid move
            const validMove = this.selectedSquare.piece.getValidMove(this.selectedSquare, targetSquare);
            if (validMove && this.kingIsSafe(this.selectedSquare, targetSquare)) {
                validMove.applyMove(this.selectedSquare, targetSquare);
                this.movePieceToTarget(this.selectedSquare, targetSquare);
                this.switchPlayer();

                if (this.isCheck()) {
                    if (this.isCheckmate()) {
                        this.message = this.player === Side.WHITE ? Side.BLACK : Side.WHITE + ' wins';
                    }
                    this.inCheck = true;
                } else {
                    this.inCheck = false;
                }
                this.unselectSquare();
            } else {
                // Change piece to move
                this.selectSquare(targetSquare);
            }
        } else {
            // Select a piece to move
            this.selectSquare(targetSquare);
        }
    }

}
