import { createStore, combineReducers } from "redux";
import { profileReducer } from "../reducers/profile-reducer";
import { dialogsReducer } from "../reducers/dialogs-reducer";
import { usersReducer } from "../reducers/users-reducer";
import { authReducer } from "../reducers/auth-reducer";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer
});

export const store = createStore(rootReducer);

export type StoreType = typeof store;
export type StateType = ReturnType<typeof rootReducer>;
// @ts-ignore
window.store = store;
