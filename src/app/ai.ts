import { GameComponent } from './game/game.component';
import { Square } from './square';
import { Side } from './piece';

export class AI {
    game: GameComponent;
    board: Square[][];
    white: boolean;
    black: boolean;

    constructor(game: GameComponent, white: boolean, black: boolean) {
        this.game = game;
        this.board = game.board;
        this.white = white;
        this.black = black;
    }

    setAI(black, white): void {
        // Turn on or off AI for each side
        this.black = black;
        this.white = white;
        this.checkAIMoves();
    }

    shuffle(list): void {
        // Basic shuffle for list
        list.sort(function() {
            return .5 - Math.random();
        });
        return list;
    }

    checkAIMoves(): void {
        //  Make a random move if the current player is an AI.  Timeout Needed for AI vs AI
        if (!this.game.gameOver && this.game.player === Side.WHITE && this.white) {
            setTimeout(this.makeRandomMove, 50);
        } else if (!this.game.gameOver && this.game.player === Side.BLACK && this.black) {
            setTimeout(this.makeRandomMove, 50);
        }
    }

    makeRandomMove = (): void => {
        // Make a random valid move

        // Get all valid moves
        const allvalidTargetSquares = [];
        for (const square of this.game.getSquaresForPlayer(this.game.player)) {
            allvalidTargetSquares.push({selected: square, targets: this.shuffle(square.piece.getValidTargetSquares(square))});
        }

        // Shuffle moves
        this.shuffle(allvalidTargetSquares);

        // Make first valid move from randomized list of moves
        for (const squares of allvalidTargetSquares) {
            for (const targetSquare of squares.targets) {
                const validMove = squares.selected.piece.getValidMove(squares.selected, targetSquare);
                if (validMove && this.game.kingIsSafe(squares.selected, targetSquare)) {
                    this.game.selectedSquare = squares.selected;
                    this.game.completeMove(validMove, squares.selected, targetSquare);
                    return;
                }
            }
        }
    }
}
