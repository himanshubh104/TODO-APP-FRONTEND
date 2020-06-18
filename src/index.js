import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from "react-redux";
import { AuthStore } from "./redux/UserStore";

ReactDOM.render(
  <Provider store={AuthStore}> 
      <Router>
        <App />
      </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
