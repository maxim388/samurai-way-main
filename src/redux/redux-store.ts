import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { createStore, combineReducers } from "redux";

export type DialogDataType = {
  id: number;
  name: string;
};

export type MessagesDataType = {
  id: number;
  message: string;
};

export type PostDataType = {
  id: number;
  message: string;
  likesCount: number;
};

export type ProfilePageType = {
  posts: Array<PostDataType>;
  newPostText: string;
};

export type DialogsPageType = {
  dialogs: Array<DialogDataType>;
  messages: Array<MessagesDataType>;
  newMessageText: string;
};

export type StateType = {
  profilePage: ProfilePageType;
  dialogsPage: DialogsPageType;
};

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
});

export const store = createStore(reducers);

export type StoreType = typeof store;
export type RootStateType = ReturnType<typeof reducers>
// @ts-ignore
window.store = store
