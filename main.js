import './style.css';
import {collideRect} from './utils/ultils'

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 600
const canvasHeight = 600
const squareSize = 40
 

class Snake {
  constructor(ctx, size) {
    this.ctx = ctx;
    //tamanho em pixels de cada lado da cobra
    this.size = size
    //cada array contém as coordenadas em pixel
    //de onde esta aquele quadrado da calda.
    this.snake = [
      {
        x: 80,
        y: 200,
      },
      {
        x: 120,
        y: 200,
      },
      {
        x: 160,
        y: 200,
      },
      {
        x: 200,
        y: 200,
      },
      {
        x: 240,
        y: 200,
      },
      {
        x: 280,
        y: 200,
      },
    ];
    this.direction = 'right'

    this.lastOrientation = 'x';
    this.orientation;
  }

  render() {
    this.ctx.fillStyle = '#787878';

    this.snake.forEach((square, index) => {
      if (index == this.snake.length - 1) {
        this.ctx.fillStyle = 'white';
      }

      this.ctx.fillRect(square.x, square.y, this.size, this.size);
    });

  }

  move() {

    //pegando o ultimo elemento do array
    //que vai ser a cabeça
    const head = this.snake.at(-1);
    this.snake.shift();

    switch (this.direction) {
      case 'right':
        this.snake.push({
          x: head.x + this.size,
          y: head.y,
        });
        this.orientation = 'x';
        break;
      case 'left':
        this.snake.push({
          x: head.x - this.size,
          y: head.y,
        });
        this.orientation = 'x';
        break;
      case 'up':
        this.snake.push({
          x: head.x,
          y: head.y - this.size,
        });
        this.orientation = 'y';
        break;
      case 'down':
        this.snake.push({
          x: head.x,
          y: head.y + this.size,
        });
        this.orientation = 'y';
        break;
    }
  }
  collision() {
    //Colisao contra as bordas
    const x = this.snake.at(-1).x + this.size / 2 < 0 || this.snake.at(-1).x + this.size / 2 > 600
    const y = this.snake.at(-1).y + this.size / 2 < 0 || this.snake.at(-1).y + this.size / 2 > 600


   if(x || y) return true

    //Colisao contra si mesmo
  for(let i = 0; i < this.snake.length - 1; i++){
    const head = this.snake.at(-1);
    //const square = this.snake[i].x, this.snake[i].y, this.size, this.size
    if(collideRect(this.snake[i], head)) return true
  }
    return false
   
  }

  update() {
    if (!this.collision()) {
      this.move();
    } 
    this.render()
  }


}

const s = new Snake(ctx, squareSize);

setInterval(() => {
  ctx.clearRect(0, 0, 600, 600);
  for (let x = 0; x < canvasWidth; x += squareSize) {
    for (let y = 0; y < canvasHeight; y += squareSize) {
      ctx.fillStyle = '#242424'; // Define a nova cor aqui
      ctx.fillRect(x, y, squareSize, squareSize);
      ctx.strokeRect(x, y, squareSize, squareSize);
    }
  }
  s.update();
}, 300);







//Renderiza e aplica os controles
let lastKeyAxies = 'x'

window.addEventListener('keydown', (event) => {

  /*
  Prevenindo que a cabeca da cobra va para o final da calda.
  Para isso, verificamos se a tecla apertada esta no mesmo eixo do comando anterior
  Se for assim, nao executamos o codigo. Se nao, executamos
  */

  /**
   * Essa funcao retorna uma string x ou y para o eixo
   */
  function takingAxiesPosition(key) {
    if (key == 'ArrowRight' || key == 'ArrowLeft') {
      return 'x'
    } else {
      return 'y'
    }
  }

  const axies = takingAxiesPosition(event.key)

  if (axies != lastKeyAxies) {
    lastKeyAxies = 'x'
    switch (event.key) {
      case 'ArrowRight':
        s.direction = 'right';
        break;
      case 'ArrowLeft':
        s.direction = 'left';
        break;
    }
  }

  if (axies != lastKeyAxies) {
    lastKeyAxies = 'y'
    switch (event.key) {
      case 'ArrowUp':
        s.direction = 'up';
        break;
      case 'ArrowDown':
        s.direction = 'down';
        break;
    }
  }
});
