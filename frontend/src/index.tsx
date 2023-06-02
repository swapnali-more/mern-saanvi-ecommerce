import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux';
import AllReducers from './ReduxSaga/Reducer/rootReducers';
import AllSagas from './ReduxSaga/Saga/rootSagas';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Utils/theme';

const middleWare = createSagaMiddleware()

const store = createStore(AllReducers, applyMiddleware(middleWare));

console.log(store)

middleWare.run(AllSagas)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
