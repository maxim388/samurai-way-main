import { createStore, combineReducers, applyMiddleware } from "redux";
import { profileReducer } from "../reducers/profile-reducer";
import { dialogsReducer } from "../reducers/dialogs-reducer";
import { usersReducer } from "../reducers/users-reducer";
import { authReducer } from "../reducers/auth-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type StoreType = typeof store;
export type StateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
