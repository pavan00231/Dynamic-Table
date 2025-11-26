// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import dataTableReducer from "./dataTableSlice";

export const store = configureStore({
  reducer: {
    dataTable: dataTableReducer
  }
});
