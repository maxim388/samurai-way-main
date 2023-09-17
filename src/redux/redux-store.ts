import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  ProfileActionTypes,
  profileReducer,
} from "../reducers/profile-reducer";
import {
  DialogsActionTypes,
  dialogsReducer,
} from "../reducers/dialogs-reducer";
import { UsersActionTypes, usersReducer } from "../reducers/users-reducer";
import { AuthActionTypes, authReducer } from "../reducers/auth-reducer";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { reducer as formReduser } from "redux-form";
import { InitializeActionTypes, appReducer } from "../reducers/app-reducer";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReduser,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type StoreType = typeof store;
export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppActionsType =
  | ProfileActionTypes
  | DialogsActionTypes
  | UsersActionTypes
  | AuthActionTypes
  | InitializeActionTypes;

export type AppDispatch = ThunkDispatch<
  AppRootStateType,
  unknown,
  AppActionsType
>;

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>;
// @ts-ignore
window.store = store;
