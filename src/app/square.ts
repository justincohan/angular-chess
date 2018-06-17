import { Piece } from './piece';

export class Square {
  isGray: boolean;
  piece: Piece;
  selected: boolean;
  x: number;
  y: number;

  constructor(gray: boolean, x: number, y: number, piece: Piece) {
    this.isGray = gray;
    this.piece = piece;
    this.x = x;
    this.y = y;
  }
}
