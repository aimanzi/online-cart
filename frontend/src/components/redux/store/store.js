import { configureStore } from "@reduxjs/toolkit";
import AllReducers from "../reducer/index.mjs";

const store = configureStore({
  reducer: {
    AllReducers,
    // window:
    //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //   window.__REDUX_DEVTOOLS_EXTENSION__(),
  },
});

store.subscribe(() => {
  var data = store.getState();
  console.log(data);
});

export default store;
