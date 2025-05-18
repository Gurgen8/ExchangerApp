import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {ErrorBoundary} from '@/components';
import {AppStateProvider, ExchangeProvider} from '@/context';
import {AppNavigation} from '@/navigation';

const App = (): React.JSX.Element => {
  return (
    <ErrorBoundary>
      <AppStateProvider>
        <ExchangeProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </ExchangeProvider>
      </AppStateProvider>
    </ErrorBoundary>
  );
};

export default App;
