import React, { FormEvent, useCallback, useState } from 'react';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { GameStartParams } from '../../Game';
import { useStyles } from './styles';

interface Props {
  onGameStart?: (params: GameStartParams) => void,
};

export const StartGame = ({ onGameStart }: Props) => {
  const classes = useStyles();
  const [width, setWidth] = useState('20');
  const [height, setHeight] = useState('20');
  const [speed, setSpeed] = useState('4');
  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (onGameStart) {
      onGameStart({ width: Number(width), height: Number(height), speed: Number(speed) });
    }
  }, [onGameStart, width, height, speed]);

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <Field label="Width" type="number" value={width} onChange={setWidth} min={8} max={40} />
      <Field label="Height" type="number" value={height} onChange={setHeight} min={8} max={40} />
      <Field label="Speed (steps per second)" type="number" value={speed} onChange={setSpeed} min={1} max={20} />
      <Button>Start The Game</Button>
    </form>
  );
};
