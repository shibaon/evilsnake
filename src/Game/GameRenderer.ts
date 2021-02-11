import { Game } from './types';

const BOARD_BACK_COLOR = '#fff';
const BOARD_CELL_COLOR = '#eee';
const SNAKE_COLOR = '#f55';
const FRUIT_COLOR = '#595';

export class GameRenderer {
  protected cellWidth = this.canvasWidth / this.game.width;
  protected cellHeight = this.canvasHeight / this.game.height;

  constructor(
    protected ctx: CanvasRenderingContext2D,
    protected game: Game,
    protected canvasWidth: number,
    protected canvasHeight: number,
  ) {
  }

  public render() {
    this.renderBoard();
    this.renderFruit();
    this.renderSnake();
  }

  protected renderBoard() {
    this.ctx.fillStyle = BOARD_BACK_COLOR;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.ctx.fillStyle = BOARD_CELL_COLOR;
    for (let y = 0; y < this.game.height; y++) {
      for (let x = 0; x < this.game.width; x++) {
        const { x: left, y: top, width, height } = this.getCellCanvasXY(x, y);
        this.ctx.fillRect(left, top, width, height);
      }
    }
  }

  protected renderSnake() {
    const { snake } = this.game;
    this.ctx.fillStyle = SNAKE_COLOR;

    for (let n = 0; n < snake.length; n++) {
      const part = snake[n];
      const { x, y, width, height } = this.getCellCanvasXY(part.x, part.y);
      this.ctx.fillRect(x, y, width, height, )
    }
  }

  protected renderFruit() {
    const { fruit } = this.game;
    this.ctx.beginPath();
    this.ctx.fillStyle = FRUIT_COLOR;
    const { x, y, width } = this.getCellCanvasXY(fruit.x, fruit.y);
    this.ctx.arc(x + width / 2, y + width / 2, width / 2 - 6, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  protected getCellCanvasXY(x: number, y: number) {
    return {
      x: x * this.cellWidth + 1,
      y: y * this.cellHeight * 1,
      width: this.cellWidth - 2,
      height: this.cellHeight - 2,
    };
  }

}
