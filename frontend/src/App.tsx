import React from "react";
import "./App.css";
import { Provider } from "react-redux/es/exports";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/router/router";
import store from "./components/redux/store/store";

function App() {
  return (
    <div className="app-container">
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
