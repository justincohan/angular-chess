export class Move {
    move: number[];
    validate: Function;
    applyMove: Function;
    blockers: number[][];

    constructor(move: number[], validate: Function, applyMove: Function, blockers: number[][]) {
        this.move = move;
        this.validate = validate;
        this.applyMove = applyMove;
        this.blockers = blockers;
    }

}



