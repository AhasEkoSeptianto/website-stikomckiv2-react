import React from "react";
import ReactDOM from "react-dom";

// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux'


// router
import { BrowserRouter as Route } from "react-router-dom";

// tailwind css
import "./index.css";
import Router from "./router";

import store from './redux/store'

ReactDOM.render(
      <Provider store={store}>
          <Route>
            <Router />
          </Route>
      </Provider>,
  document.getElementById("root")
);
