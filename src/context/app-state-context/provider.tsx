import React, {ReactNode, useEffect, useState} from 'react';

import NetInfo from '@react-native-community/netinfo';

import {AppStateContext} from './context';

interface TAppStateProviderProps {
  children: ReactNode;
}

export function AppStateProvider({children}: TAppStateProviderProps) {
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOfflineMode(!state.isInternetReachable);
    });

    NetInfo.fetch().then(state => {
      setIsOfflineMode(!state.isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppStateContext.Provider value={{isOfflineMode}}>
      {children}
    </AppStateContext.Provider>
  );
}
