import {createContext, useContext} from 'react';

export type TAppStateContext = {
  isOfflineMode: boolean;
};

export const AppStateContext = createContext<TAppStateContext>({
  isOfflineMode: false,
});
export const useAppStateContext = () => useContext(AppStateContext);
