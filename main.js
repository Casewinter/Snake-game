import './style.css';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

class Snake {
  constructor(ctx) {
    this.ctx = ctx;
    //tamanho em pixels de cada lado da cobra
    this.size = 30;
    //cada array contém as coordenadas em pixel
    //de onde esta aquele quadrado da calda.
    this.snake = [
      {
        x: 230,
        y: 200,
      },
      {
        x: 260,
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
  update() {
    this.move();
    this.render();
  }
}

const s = new Snake(ctx);

setInterval(() => {
  ctx.clearRect(0, 0, 600, 600);
  s.update();
}, 300);


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
