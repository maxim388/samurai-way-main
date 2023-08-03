import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { createStore, combineReducers } from "redux";

const reducers = combineReducers({
  profilePage: dialogsReducer,
  dialogsPage: profileReducer,
});

export const store = createStore(reducers);
