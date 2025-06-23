import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './src/locales/i18n';
import { AppNavigation } from './src/navigations/app.navigation';
import { persistor, store } from './src/redux/store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <AppNavigation />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
