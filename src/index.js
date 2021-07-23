import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from "react-redux"
import './index.css';
import App from './components/App';
import reducer from './reducer'
import combinedMiddleware from './middleware'

const store = createStore(reducer, combinedMiddleware)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);