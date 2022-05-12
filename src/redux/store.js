import { applyMiddleware, legacy_createStore as createStore } from "redux";
import reducers from "./reducers/index.js";
import thunk from "redux-thunk";

// * **We recommend using the `configureStore` method
//  * of the `@reduxjs/toolkit` package**, which replaces `createStore`.


const middleware = [thunk];
const initialStat = {};

// const store=createStore(reducers,initialStat,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());/
const store = createStore(
  reducers,
  initialStat,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(applyMiddleware(...middleware))
);

export default store;
