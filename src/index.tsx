import React from "react";
import ReactDOM from "react-dom";
import './asset/scss/mansory.scss'
import { ToastContainer, toast } from 'react-toastify';
// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux'


// router
import { BrowserRouter as Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
// tailwind css
import "./index.css";
import './asset/css/global.css'
import Router from "./router";

import store from './redux/store'

ReactDOM.render(
      <Provider store={store}>
          <Route>
            <ToastContainer />
            <Router />
          </Route>
      </Provider>,
  document.getElementById("root")
);
