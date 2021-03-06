export default class Board {
    boardHeight = 500
    gridSize = this.boardHeight / 9
    boardWidth = this.boardHeight - this.gridSize
    margin = 5
    lineWidth = 3
    crossLineLength = this.gridSize * 0.2
    mainColor = "red"

    constructor(draw) {
        this.draw = draw
    }

    initialBoard = () => {
        this.drawVLines()
        this.drawHLines()
        this.drawPawnsLine()
        this.drawCannonsLine()
        this.drawCrossLine()
        this.drawText()
    }

    drawHLines = () => {
        const {
            draw,
            boardWidth,
            margin,
            lineWidth,
            mainColor,
            gridSize,
        } = this

        const vLines = []
        for (let i = 0; i < 10; ++i) {
            draw.line([
                [margin, margin + i * gridSize],
                [margin + boardWidth, margin + i * gridSize],
            ]).stroke({ width: lineWidth, color: mainColor })
        }

        return vLines
    }

    drawVLines = () => {
        const {
            draw,
            boardHeight,
            margin,
            lineWidth,
            mainColor,
            gridSize,
        } = this
        for (let i = 0; i < 9; ++i) {
            if (i === 0 || i === 8) {
                draw.line([
                    [margin + i * gridSize, margin],
                    [margin + i * gridSize, margin + boardHeight],
                ]).stroke({ width: lineWidth, color: mainColor })
            } else {
                draw.line([
                    [margin + i * gridSize, margin],
                    [margin + i * gridSize, margin + 4 * gridSize],
                ]).stroke({ width: lineWidth, color: mainColor })
                draw.line([
                    [margin + i * gridSize, margin + 5 * gridSize],
                    [margin + i * gridSize, margin + boardHeight],
                ]).stroke({ width: lineWidth, color: mainColor })
            }
        }
    }

    drawPawnsLine = () => {
        const { margin, gridSize } = this
        const interval = 2
        for (let i = 0; i < 5; ++i) {
            // ??????
            this.drawDotLine({
                x: margin + i * interval * gridSize,
                y: margin + 3 * gridSize,
                showLeft: i > 0,
                showRight: i < 4
            })
            // ??????
            this.drawDotLine({
                x: margin + i * interval * gridSize,
                y: margin + 6 * gridSize,
                showLeft: i > 0,
                showRight: i < 4
            })
        }
    }

    drawCannonsLine = () => {
        const { margin, gridSize } = this
        for (let i = 0; i < 2; ++i) {
            // ??????
            this.drawDotLine({
                x: margin + gridSize * (i === 0 ? 1 : 7),
                y: margin + 2 * gridSize
            })
            // ??????
            this.drawDotLine({
                x: margin + gridSize * (i === 0 ? 1 : 7),
                y: margin + 7 * gridSize
            })
        }
    }

    drawDotLine = ({ x, y, showLeft = true, showRight = true }) => {
        const { draw, crossLineLength, lineWidth, mainColor } = this
        const span = 5
        if (showLeft) {
            // ?????????
            draw.polyline([
                [x - span, y - span - crossLineLength], // ???
                [x - span, y - span], // ???
                [x - span - crossLineLength, y - span], // ???
            ])
                .stroke({ width: lineWidth, color: mainColor })
                .fill("none")
            // ?????????
            draw.polyline([
                [x - span - crossLineLength, y + span], // ???
                [x - span, y + span], // ???
                [x - span, y + span + crossLineLength], // ???
            ])
                .stroke({ width: lineWidth, color: mainColor })
                .fill("none")
        }

        if (showRight) {
            // ?????????
            draw.polyline([
                [span + x, y - crossLineLength - span], // ???
                [span + x, y - span], // ???
                [span + x + crossLineLength, y - span], // ???
            ])
                .stroke({ width: lineWidth, color: mainColor })
                .fill("none")
            //?????????
            draw.polyline([
                [span + x + crossLineLength, span + y], // ???
                [span + x, span + y], // ???
                [span + x, y + crossLineLength + span], // ???
            ])
                .stroke({ width: lineWidth, color: mainColor })
                .fill("none")
        }
    }

    drawCrossLine = () => {
        const { draw, margin, gridSize, lineWidth, mainColor } = this
        for (let i = 0; i < 2; ++i) {
            // ???
            draw.polyline([
                [margin + 3 * gridSize, margin], 
                [margin + 5 * gridSize, margin + 2 * gridSize], 
                [margin + 5 * gridSize, margin], 
                [margin + 3 * gridSize, margin + 2 * gridSize]
            ])
                .stroke({ width: lineWidth, color: mainColor })
                .fill("none")
            // ???
            draw.polyline([
                [margin + 3 * gridSize, margin + 7 * gridSize], 
                [margin + 5 * gridSize, margin + 9 * gridSize], 
                [margin + 5 * gridSize, margin + 7 * gridSize], 
                [margin + 3 * gridSize, margin + 9 * gridSize]
            ])
                .stroke({ width: lineWidth, color: mainColor })
                .fill("none")
        }
    }

    drawText = () => {
        // eslint-disable-next-line no-unused-vars
        const { draw, boardWidth, margin, gridSize, mainColor } = this
        for (const word of "????????????") {
            let rotate = -90
            let x = margin + gridSize
            const y = 6 * margin + 4 * gridSize
            if (word === "???") {
                x = 2 * gridSize
            } else if (word === "???") {
                x = boardWidth - 2.5 * gridSize - margin
                rotate = 90
            } else if (word === "???") {
                x = boardWidth - 1.5 * gridSize - margin
                rotate = 90
            }
            draw.text(word)
                .x(x)
                .y(y)
                // .rotate(30, 20,40)
                .fill(mainColor)
                .font({
                    family: "Helvetica",
                    size: 35,
                    anchor: "start",
                    // leading: "1.5em",
                })
                .transform({ rotate })
        }
    }
}
