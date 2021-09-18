import { SVG } from '@svgdotjs/svg.js'
import Board from './board'

export default class Chess {
    constructor(element) {
        
        const draw = SVG().addTo(element).size(600, 600)
        this.board = new Board(draw)

    }

    initialChess = () => {
        this.board.initialBoard()
    }
}