import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Experimental_CssVarsProvider as CssVarProvider } from '@mui/material/styles';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CssVarProvider>
            <App />
          </CssVarProvider>
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
);
