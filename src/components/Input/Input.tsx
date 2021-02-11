import React, { ChangeEvent, memo, useCallback } from 'react';
import clsx from 'clsx';
import { useStyles } from './styles';

export interface Props {
  className?: string;
  type?: 'text' | 'number';
  value?: string | number;
  onChange?: (val: string) => void;
  min?: number;
  max?: number;
};

export const Input = memo(({ className, type = 'text', value, min, max, onChange }: Props) => {
  const classes = useStyles();
  const onChangeCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  }, [onChange]);

  return (
    <input
      className={clsx(classes.root, className)}
      min={min}
      max={max}
      type={type}
      value={value}
      onChange={onChangeCallback}
    />
  );
});
