import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './router';
import Store from './store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'

const persist = persistStore(Store)
const renders = () => {
  return (<React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persist}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  renders()
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
