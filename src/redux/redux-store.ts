import { createStore, combineReducers } from "redux";
import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { usersReducer } from "./users-reducer";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
});
 
export const store = createStore(rootReducer);

export type StoreType = typeof store;
export type StateType = ReturnType<typeof rootReducer>;
// @ts-ignore
window.store = store;
