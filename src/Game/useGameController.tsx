import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { GameController } from './GameController';

const Context = createContext(undefined as any as { controller: GameController });

export const GameControllerContext = ({ children }: PropsWithChildren<{}>) => {
  const controller = useMemo(() => new GameController(() => undefined), []);
  const [value, setValue] = useState({ controller });
  const redrawCollback = useCallback(() => setValue({ controller }), []);
  controller.setRedrawCallback(redrawCollback);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export const useGameController = () => useContext(Context).controller;
