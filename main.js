import './style.css';
import Snake from './components/Snake';
import Controls from './components/Controls';
import Apple from './components/Apple';

let score = 0
const scorePlayer = document.getElementById('score')


const canvasSize = 400
const canvas = document.getElementById('myCanvas');
const modal = document.getElementById('modal')

const yesButton = document.getElementById('yesButton')


canvas.width = canvasSize;
canvas.height = canvasSize;

const ctx = canvas.getContext('2d');

const squareSize = 20

const snake = new Snake(ctx, squareSize, canvasSize);
const apple = new Apple(ctx, squareSize, canvasSize, snake.snake)
const controls = new Controls(snake)
controls.startControls()

let gameEngine

const startGame = () => {
  gameEngine = setInterval(Game, 300);
}

function Game() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  for (let x = 0; x < canvasSize; x += squareSize) {
    for (let y = 0; y < canvasSize; y += squareSize) {
      ctx.fillStyle = '#242424';
      ctx.fillRect(x, y, squareSize, squareSize);
      ctx.strokeRect(x, y, squareSize, squareSize);
    }
  }
  apple.draw()
  snake.update();
  controls.unlockingControlsByNewFrame()

  //Se a cobra comer a maçã
  if (snake.eat(apple)) {
    score++
    scorePlayer.innerText = score
  }

  if (!snake.isAlive) {
    modal.showModal()
    clearInterval(gameEngine)
    gameEngine = null
  }
}

yesButton.addEventListener('click', restart)

function restart() {

  snake.snake = [
    {
      x: 140,
      y: 200,
      width: squareSize,
      height: squareSize
    },

    {
      x: 160,
      y: 200,
      width: squareSize,
      height: squareSize
    },

  ];

  snake.direction = 'right'

  snake.lastOrientation = 'x';
  snake.orientation;
  snake.score = 0
  snake.isAlive = true
  const controls = new Controls(snake)
  controls.startControls()

  modal.close()
  startGame()

}

startGame()