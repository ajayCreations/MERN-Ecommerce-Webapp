
import { combineReducers } from "redux";
import { productReducer } from "./productReducer";

const reducer = combineReducers({
product:productReducer
});

export default reducer;