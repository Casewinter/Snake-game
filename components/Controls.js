class Controls {
  constructor(snake) {

    this.snake = snake
    this.lastKeyAxies = 'x'
    this.intraFramePrevent = 0
    this.state = true
  }  
  /*
   Okay, o player so deveria ser capaz de executar um comando por frame.
   Caso isso nao aconetca, ele pode mudar duas vezes a lastKeyAxies
   e causar um bug onde no proximo frame, a cobra entrou no proprio corpo
  */
 /**
  * Essa função garante que os controles sejam liberados uma vez por frame.
  */
  unlockingControlsByNewFrame(){
 
    this.state = true
  }
  startControls() {
    window.addEventListener('keydown', (event) => {
      if(this.state){
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
  
        if (axies != this.lastKeyAxies) {
          this.lastKeyAxies = 'x'
          switch (event.key) {
            case 'ArrowRight':
              this.snake.direction = 'right';
              break;
            case 'ArrowLeft':
              this.snake.direction = 'left';
              break;
          }
        }
  
        if (axies != this.lastKeyAxies) {
          this.lastKeyAxies = 'y'
          switch (event.key) {
            case 'ArrowUp':
              this.snake.direction = 'up';
              break;
            case 'ArrowDown':
              this.snake.direction = 'down';
              break;
          }
        }
      }
      this.state = false
    })
  }
}

export default Controls