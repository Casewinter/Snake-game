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
    this.direction;

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
    //vamos comparar a orientacao anterior com a nova
    //e evitar que a cabeca va para a ponta da calda
    if (this.lastOrientation == this.orientation) {
      return;
    }

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
        this.lastOrientation = 'x';
        break;
      case 'left':
        this.snake.push({
          x: head.x - this.size,
          y: head.y,
        });
        this.lastOrientation = 'x';
        break;
      case 'up':
        this.snake.push({
          x: head.x,
          y: head.y - this.size,
        });
        this.lastOrientation = 'y';
        break;
      case 'down':
        this.snake.push({
          x: head.x,
          y: head.y + this.size,
        });
        this.lastOrientation = 'y';
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

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      s.direction = 'right';
      break;
    case 'ArrowLeft':
      s.direction = 'left';
      break;
    case 'ArrowUp':
      s.direction = 'up';
      break;
    case 'ArrowDown':
      s.direction = 'down';
      break;
  }
});
