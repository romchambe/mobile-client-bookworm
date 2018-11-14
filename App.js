import React from 'react';

import AssetLoader from './components/AssetLoader';
import Root from './components/Root';

import {Text } from 'react-native'
import { Font, AppLoading } from 'expo';
import rootReducer from './core-modules/reducers/rootReducer';
import initialState from './core-modules/initialState'; 

// Redux standard modules
import { Provider } from 'react-redux'; // top level component for React so that all components can subscribe to the store
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

// Redux-compatible Routing with connected-react-router 
import { createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { connectRouter, routerMiddleware } from 'connected-react-router';

// Redux-persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native


const loggerMiddleware = createLogger();

const history = createMemoryHistory();

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user', 'session', 'notes']
};

const persistedReducer = persistReducer(persistConfig, connectRouter(history)(rootReducer)); // new root reducer with router state


const store = createStore(
  persistedReducer, 
  initialState,
  applyMiddleware(
    routerMiddleware(history), // for dispatching history actions
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

const persistor = persistStore(store)

class App extends React.Component {
  state = { isReady: false }

  async _loadAssetsAsync() {
    await Font.loadAsync({
      'cabin': require('./assets/Cabin/Cabin-Regular.ttf'),
      'cabin-bold': require('./assets/Cabin/Cabin-Bold.ttf'),
      'cabin-italic': require('./assets/Cabin/Cabin-Italic.ttf'),
      'cabin-medium': require('./assets/Cabin/Cabin-Medium.ttf'),
      'cabin-semi-bold': require('./assets/Cabin/Cabin-SemiBold.ttf'),
      'cabin-medium-italic': require('./assets/Cabin/Cabin-MediumItalic.ttf'),
      'cabin-bold-italic': require('./assets/Cabin/Cabin-BoldItalic.ttf'),
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
       
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => {
            this.setState({ isReady: true });
          }}
          onError={console.warn}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
              <Root />
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      );
    }
  }
}

export default App