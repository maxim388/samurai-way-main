import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";

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

export type StateType = {
  profilePage: {
    posts: Array<PostDataType>;
    newPostText: string;
  };
  dialogsPage: {
    dialogs: Array<DialogDataType>;
    messages: Array<MessagesDataType>;
    newMessageText: string;
  };
};

export type StoreType = {
  _state: StateType;
  getState: () => StateType;
  _callSubscriber: (state: StateType) => void;
  subscribe: (observer: any) => void;
  dispatch: (action: any, newText?: string) => void;
};

//___________________________________________________________________________________________________________________________________________
export let store: StoreType = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi! How are you?", likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 11 },
        { id: 3, message: "Blabla", likesCount: 11 },
        { id: 4, message: "Dada", likesCount: 11 },
      ],
      newPostText: "",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Andrew" },
        { id: 3, name: "Sveta" },
        { id: 4, name: "Sasha" },
        { id: 5, name: "Viktor" },
        { id: 6, name: "Valera" },
      ],
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How is your it-kamasutra?" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo" },
      ],
      newMessageText: "",
    },
  },
  _callSubscriber() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action: any) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._callSubscriber(this.getState());
  },
};














