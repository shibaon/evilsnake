/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Button } from '../../components/Button';
import { GameRenderer, SnakeDirection, useGameController } from '../../Game';
import { useStyles } from './styles';

const CANVAS_SIZE = 500;
const DIRECTIONS_MAP: [[string, string], SnakeDirection][] = [
  [['KeyA', 'ArrowLeft'], 'left'],
  [['KeyW', 'ArrowUp'], 'top'],
  [['KeyD', 'ArrowRight'], 'right'],
  [['KeyS', 'ArrowDown'], 'bottom'],
];

export const Game = () => {
  const classes = useStyles();
  const canvasRef = useRef(undefined as any as HTMLCanvasElement);
  const controller = useGameController();
  const { width, height } = useMemo(() => {
    if (!controller.game) throw new Error('game is undefined');
    if (controller.game.width > controller.game.height) {
      return { width: CANVAS_SIZE, height: CANVAS_SIZE * controller.game.height / controller.game.width };
    }
    return { width: CANVAS_SIZE * controller.game.width / controller.game.height, height: CANVAS_SIZE };
  }, []);
  const tryAgainCallback = useCallback(() => {
    controller.resetGame();
  }, []);

  useEffect(() => {
    let ctx = canvasRef.current.getContext('2d');
    if (!ctx) throw new Error('getContext returned null result');
    const { game } = controller;
    if (!game) throw new Error('game is undefined (');

    /* High dpr support */
    const dpr = window.devicePixelRatio;
    canvasRef.current.width = dpr * width;
    canvasRef.current.height = dpr * height;
    canvasRef.current.style.width = width + 'px';
    canvasRef.current.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const keyDownEventListener = (e: KeyboardEvent) => {
      for (const mp of DIRECTIONS_MAP) {
        if (mp[0].includes(e.code)) {
          controller.setSnakeDirection(mp[1]);
          return;
        }
      }
    };
    window.addEventListener('keydown', keyDownEventListener);

    const gameRenderer = new GameRenderer(ctx, game, width, height);
    const gameLogicTicker = () => {
      controller.snakeStep();
      if (!game.finished) {
        setTimeout(gameLogicTicker, 1000 / game.speed);
      }
    };
    setTimeout(gameLogicTicker, 1000 / game.speed);

    const renderer = () => {
      gameRenderer.render();
      if (ctx && !game.finished) {
        requestAnimationFrame(renderer);
      }
    };
    requestAnimationFrame(renderer);

    return () => {
      ctx = null;
      window.removeEventListener('keydown', keyDownEventListener);
    };
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.score}>Score: {controller.game?.eaten}</div>
      <canvas ref={canvasRef} width={width} height={height} />
      {controller.game?.finished && (
        <div className={classes.gameOver}>
          <div>
            <p>Trichophagia detected! You have lost.</p>
            <Button onClick={tryAgainCallback}>Try Again</Button>
          </div>
        </div>
      )}
    </div>
  );
};
