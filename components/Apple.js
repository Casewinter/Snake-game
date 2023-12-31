import { collideRect } from "../utils/ultils";

class Apple {
    constructor(ctx, size, canvasSize, snakePosition) {
        this.size = size
        this.canvasSize = canvasSize
        this.ctx = ctx;
        this.square = {
            x: canvasSize - size * 4,
            y: canvasSize - size * 4,
            width: size,
            height: size
        }
        this.snakePosition = snakePosition
    }

    draw() {
        this.ctx.fillStyle = '#A72424';
        this.ctx.fillRect(this.square.x, this.square.y, this.square.width, this.square.height);
        this.ctx.strokeRect(this.square.x, this.square.y, this.square.width, this.square.height);
    }
    updatePosition() {
        const min = this.square.height
        const max = this.canvasSize - this.square.height
        const threshold = this.canvasSize - this.size + 1

        let newLocationX = Math.floor(Math.random() * threshold);
        let newLocationY = Math.floor(Math.random() * threshold);

        if (newLocationX < min || newLocationX > max) {
            newLocationX = Math.floor(Math.random() * threshold);

        }

        if (newLocationY < min || newLocationY > max) {
            newLocationY = Math.floor(Math.random() * threshold);
        }

        while (newLocationX % this.size != 0) {
            if (newLocationX < max) {
                newLocationX++
            } else {
                newLocationX--
            }

        }

        while (newLocationY % this.size != 0) {
            if (newLocationY < max) {
                newLocationY++
            } else {
                newLocationY--
            }

        }

        this.square.x = newLocationX
        this.square.y = newLocationY

        this.snakePosition.forEach((square) => {
            const apple = {
                x: this.square.x,
                y: this.square.y,
                width: this.size,
                height: this.size
            }
            if (collideRect(square, apple)) {
                this.updatePosition()
            }
        });

        this.draw()
    }
}


export default Apple