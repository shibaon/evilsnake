import React, { useCallback } from 'react';
import { GameControllerContext, GameStartParams, useGameController } from '../Game';
import { Game } from '../Pages/Game';
import { StartGame } from '../Pages/StartGame';
import { useStyles } from './styles';

const WrappedApp = () => {
  const classes = useStyles();
  const gameController = useGameController();
  const onGameStart = useCallback((params: GameStartParams) => {
    gameController.startGame(params);
  }, []);

  return (
    <div className={classes.root}>
      {gameController.game ? (
        <Game />
      ) : (
        <StartGame onGameStart={onGameStart} />
      )}
    </div>
  );
};

export const App = () => (
  <GameControllerContext>
    <WrappedApp />
  </GameControllerContext>
);
