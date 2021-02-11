import clsx from 'clsx';
import React, { memo, PropsWithChildren } from 'react';
import { useStyles } from './styles';

interface Props extends PropsWithChildren<{}> {
  className?: string;
  onClick?: () => void;
};

export const Button = memo(({ onClick, className, children }: Props) => {
  const classes = useStyles();

  return (
    <button className={clsx(classes.root, className)} onClick={onClick}>
      {children}
    </button>
  );
});
