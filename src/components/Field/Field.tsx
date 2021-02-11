import clsx from 'clsx';
import React, { memo } from 'react'
import { Input, Props as InputProps } from '../Input'
import { useStyles } from './styles';

interface Props extends InputProps {
  label?: string;
};

export const Field = memo(({ label, className, ...props }: Props) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {label && <label className={classes.label}>{label}</label>}
      <Input {...props} />
    </div>
  );
});
