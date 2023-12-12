import './style.css';
import Snake from './components/Snake';
import Controls from './components/Controls'; 
import Apple from './components/Apple';


const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 600
const canvasHeight = 600
const squareSize = 40


const snake = new Snake(ctx, squareSize);
const apple = new Apple(ctx, squareSize, canvasWidth, snake.snake)
const controls = new Controls(snake)
controls.startControls()

setInterval(() => {
  ctx.clearRect(0, 0, 600, 600);
  for (let x = 0; x < canvasWidth; x += squareSize) {
    for (let y = 0; y < canvasHeight; y += squareSize) {
      ctx.fillStyle = '#242424'; 
      ctx.fillRect(x, y, squareSize, squareSize);
      ctx.strokeRect(x, y, squareSize, squareSize);
    }
  }
  apple.draw()
  snake.update();
  controls.unlockingControlsByNewFrame()

  //Se a cobra comer a maçã
  snake.eat(apple)
}, 300);


