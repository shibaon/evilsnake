export interface GameStartParams {
  width: number;
  height: number;
  speed: number;
};

interface Snake extends Array<{ x: number, y: number }> {}

export interface Fruit { x: number, y: number };

export type SnakeDirection = 'top' | 'right' | 'bottom' | 'left';

export interface Game extends GameStartParams {
  eaten: number;
  finished: boolean;
  snake: Snake;
  fruit: Fruit;
  snakeDirection: SnakeDirection;
}
