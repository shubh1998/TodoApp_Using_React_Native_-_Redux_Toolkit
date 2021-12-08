import { combineReducers } from "@reduxjs/toolkit";
import ListReducer from "./List/ListReducer";
import TaskReducer from "./Task/TaskReducer"

export const rootReducer = combineReducers({
    ListReducer,
    TaskReducer
});
