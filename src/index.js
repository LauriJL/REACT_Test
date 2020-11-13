import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import './App.css';
import * as serviceWorker from './serviceWorker';
import Navigaatio from './Navigaatio'

ReactDOM.render((
  <BrowserRouter>
    <Navigaatio />
  </BrowserRouter>),
  document.getElementById('root')
);

serviceWorker.unregister();
