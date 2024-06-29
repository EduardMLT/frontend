import { combineReducers } from "@reduxjs/toolkit";
import { booksSlice } from "./slices";
import { serviceReducer } from "./slices/servicesSlice/servicesSlice";

const rootReducer = combineReducers({
  book: booksSlice.reducer,
  service: serviceReducer,
});

export default rootReducer;
