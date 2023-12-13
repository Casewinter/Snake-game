import {collideRect} from '../utils/ultils'

class Snake {
    constructor(ctx, size) {
        this.ctx = ctx;
        //tamanho em pixels de cada lado da cobra
        this.size = size
        //cada array contém as coordenadas em pixel
        //de onde esta aquele quadrado da calda.
        this.eatState = false
        this.snake = [
            {
                x: 240,
                y: 200,
                width: this.size,
                height: this.size
            },
           
            {
                x: 280,
                y: 200,
                width: this.size,
                height: this.size
            },
        ];
        this.direction = 'right'

        this.lastOrientation = 'x';
        this.orientation;
        this.score = 0
        this.isAlive = true
    }

    draw() {
        this.ctx.fillStyle = '#787878';

        this.snake.forEach((square, index) => {
            if (index == this.snake.length - 1) {
                this.ctx.fillStyle = 'white';
            }

            this.ctx.fillRect(square.x, square.y, square.width, square.height);
            this.ctx.strokeRect(square.x, square.y, square.width, square.height);
        });

    }

    move() {

        //pegando o ultimo elemento do array
        //que vai ser a cabeça
        //vamos usar as coordenadas dela para criar o proximo quadrado
        const head = this.snake.at(-1);

        if(!this.eatState) {
            this.snake.shift();
            
        } else {
            this.eatState = !this.eatState
        }

        switch (this.direction) {
            case 'right':
                this.snake.push({
                    x: head.x + this.size,
                    y: head.y,
                    width: this.size,
                    height: this.size
                });
                this.orientation = 'x';
                break;
            case 'left':
                this.snake.push({
                    x: head.x - this.size,
                    y: head.y,
                    width: this.size,
                    height: this.size
                });
                this.orientation = 'x';
                break;
            case 'up':
                this.snake.push({
                    x: head.x,
                    y: head.y - this.size,
                    width: this.size,
                    height: this.size
                });
                this.orientation = 'y';
                break;
            case 'down':
                this.snake.push({
                    x: head.x,
                    y: head.y + this.size,
                    width: this.size,
                    height: this.size
                });
                this.orientation = 'y';
                break;
        }
    }
    collision() {
        //Colisao contra as bordas
        const x = this.snake.at(-1).x + this.size / 2 < 0 || this.snake.at(-1).x + this.size / 2 > 600
        const y = this.snake.at(-1).y + this.size / 2 < 0 || this.snake.at(-1).y + this.size / 2 > 600


        if (x || y) return true

        //Colisao contra si mesmo
        for (let i = 0; i < this.snake.length - 1; i++) {
            const head = this.snake.at(-1);

            if (collideRect(this.snake[i], head)) return true
        }

        return false
    }

    eat(applePosition){
        if(this.snake.at(-1).x == applePosition.square.x && this.snake.at(-1).y == applePosition.square.y ) {
            applePosition.updatePosition()
            this.eatState = !this.eatState 
            return true
          } else {
            return false
          }
    
    }

    update() {
        if (!this.collision()) {
            this.move();
        } else {
            
        }

        this.draw()
    }
}

export default Snake