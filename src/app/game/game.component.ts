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

import { Move } from '../move';
import { AI } from '../ai';

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
    board: Square[][];
    enPassant: { pawnSquare: Square, targetSquare: Square};
    selectedSquare: Square;
    player: Side;
    message: string;
    gameOver: boolean;
    inCheck: boolean;
    AI: AI;
    holdPieces: { targetSquarePiece: Piece, currentSquarePiece: Piece };
    promotingSquare: Square;

    ngOnInit() {
        // Initialize our game board with squares and pieces
        this.board = [];
        this.enPassant = {pawnSquare: null, targetSquare: null};
        this.selectedSquare = null;
        this.player = Side.WHITE;
        this.message = 'Welcome';
        this.gameOver = false;
        this.inCheck = false;
        this.holdPieces = null;
        this.AI = new AI(this, false, false);

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

    promote(piece): void {
        this.promotingSquare.piece = new piece(this.promotingSquare.piece.side, this);
        this.promotingSquare = null;
        this.completeMove(null, null, null);
    }

    promoteQueen(): void {
        this.promote(Queen);
    }

    promoteRook(): void {
        this.promote(Rook);
    }

    promoteKnight(): void {
        this.promote(Knight);
    }

    promoteBishop(): void {
        this.promote(Bishop);
    }

    resetGame(): void {
        // Reset board and everything else
        this.ngOnInit();
    }

    findKingSquare(): Square {
        // Find the king square for the current player
        for (const square of this.getSquaresForPlayer(this.player)) {
            if (square.piece.type === 'King') {
                return square;
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

    getSquaresForPlayer(player: string) {
        // Return all squares with this players pieces on it
        const squaresForPlayer = [];
        for (const row of this.board) {
            for (const square of row) {
                if (square.piece && square.piece.side === player) {
                    squaresForPlayer.push(square);
                }
            }
        }
        return squaresForPlayer;
    }

    isCheck(): boolean {
        // Is the king in check on the board
        const kingSquare = this.findKingSquare();
        for (const square of this.getSquaresForPlayer(this.getOtherPlayer())) {
            // Could this piece attack the king square
            if (square.piece.getValidMove(square, kingSquare)) {
                return true;
            }
        }
        return false;
    }

    isCheckmate(): boolean {
        // Is there any possible move where the king won't be in check
        for (const square of this.getSquaresForPlayer(this.player)) {
            const validMoves = square.piece.getValidTargetSquares(square);
            for (const validMove of validMoves) {
                // Can this piece make a move that would stop the king from being in check?
                if (this.kingIsSafe(square, validMove)) {
                    return false;
                }
            }
        }
        return true;
    }

    isStalemate(): boolean {
        // If not in check and no way to make a move doesn't put you in check it is a stalemate
        return this.isCheckmate();
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

    getOtherPlayer(): Side {
        // Get the non active player
        return (this.player === Side.WHITE ? Side.BLACK : Side.WHITE);
    }

    switchPlayer(): void {
        // Now the other players turn
        this.player = this.getOtherPlayer();
        this.message = this.player + '\'s turn';
    }

    completeMove(validMove: Move, selectedSquare: Square, targetSquare: Square): void {
        // Move is valid go ahead and move pieces and perform game checks
        if (validMove) {
            validMove.applyMove(selectedSquare, targetSquare);
        }
        if (this.promotingSquare) { // Will finish after promoting
            return;
        }
        this.switchPlayer();

        if (this.isCheck()) {
            if (this.isCheckmate()) {
                this.message = this.getOtherPlayer() + ' wins';
                this.gameOver = true;
            }
            this.inCheck = true;
        } else {
            if (this.isStalemate()) {
                this.message = 'Stalemate';
                this.gameOver = true;
            }
            this.inCheck = false;
        }
        this.unselectSquare();
        this.AI.checkAIMoves();
    }

    movePiece(targetSquare: Square): void {
        // Handle selecting a piece and moving it
        if (this.promotingSquare) { // No selecting until promotion piece is chosen
            return;
        }
        if (this.selectedSquare) { // If a piece is selected then check if the target is a valid move
            const validMove = this.selectedSquare.piece.getValidMove(this.selectedSquare, targetSquare);
            if (validMove && this.kingIsSafe(this.selectedSquare, targetSquare)) {
                this.completeMove(validMove, this.selectedSquare, targetSquare);
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
