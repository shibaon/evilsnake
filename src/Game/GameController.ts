import { Game, GameStartParams, Fruit } from './types';

export class GameController {
  public game?: Game;

  constructor(protected redrawCallback: () => void) {}

  public setRedrawCallback(callback: () => void) {
    this.redrawCallback = callback;
  }

  public startGame(params: GameStartParams) {
    const centerX = Math.round(params.width / 2);
    const centerY = Math.round(params.height / 2);

    this.game = {
      ...params,
      eaten: 0,
      snakeDirection: 'top',
      fruit: { x: 0, y: 0 },
      finished: false,
      snake: [{ x: centerX, y: centerY + 3 }, { x: centerX, y: centerY + 2 }, { x: centerX, y: centerY + 1 }],
    };
    this.game.fruit = this.generateFruit();
    this.redrawCallback();
  }

  public resetGame() {
    this.game = undefined;
    this.redrawCallback();
  }

  public snakeStep() {
    const { game } = this;
    if (!game) throw new Error('Game is not defined');
    const { snake } = game;
    let part = snake[snake.length - 1];
    let prevPos = { ...part };

    if (game.snakeDirection === 'top') { /* head moving */
      part.y--;
    } else if (game.snakeDirection === 'right') {
      part.x++;
    } else if (game.snakeDirection === 'bottom') {
      part.y++;
    } else if (game.snakeDirection === 'left') {
      part.x--;
    }

    if (part.x === game.fruit.x && part.y === game.fruit.y) { /* bon appetie! */
      part.x = prevPos.x;
      part.y = prevPos.y;
      snake.push({ ...game.fruit });
      game.fruit = this.generateFruit();
      game.eaten++;
      game.speed += game.speed * 0.01; /* faster and faster */
      this.redrawCallback();
      return;
    }

    for (let n = snake.length - 2; n >= 0; n--) { /* all snake body moving */
      const savePos = { ...snake[n] };
      snake[n].x = prevPos.x;
      snake[n].y = prevPos.y;
      prevPos = savePos;
    }

    for (let n = snake.length - 1; n >= 0; n--) { /* snake teleportation */
      const part = snake[n];
      if (part.x < 0) {
        part.x = game.width - 1;
      }
      if (part.x >= game.width) {
        part.x = 0;
      }
      if (part.y < 0) {
        part.y = game.height - 1;
      }
      if (part.y >= game.height) {
        part.y = 0;
      }
    }

    for (let n = snake.length - 1; n >= 1; n--) {
      for (let nn = n - 1; nn >= 0; nn--) {
        if (snake[n].x === snake[nn].x && snake[n].y === snake[nn].y) { /* game is over :-() */
          game.finished = true;
          this.redrawCallback();
        }
      }
    }
  }

  public setSnakeDirection(newDirection: 'top' | 'right' | 'bottom' | 'left') {
    if (!this.game) throw new Error('game is undefined');
    const { snakeDirection: direction } = this.game;
    if (newDirection === 'left' && direction === 'right') return;
    if (newDirection === 'right' && direction === 'left') return;
    if (newDirection === 'top' && direction === 'bottom') return;
    if (newDirection === 'bottom' && direction === 'top') return;
    this.game.snakeDirection = newDirection;
  }

  protected generateFruit(): Fruit {
    const { game } = this;
    if (!game) throw new Error('game is undefined');
    
    let fruit: Fruit;
    let occupied = true;

    do {
      fruit = { x: Math.floor(Math.random() * game.width), y: Math.floor(Math.random() * game.width) };
      // eslint-disable-next-line no-loop-func
      occupied = !!game.snake.find((s) => s.x === fruit.x && s.y === fruit.y);
    } while (occupied);

    return fruit;
  }

}
