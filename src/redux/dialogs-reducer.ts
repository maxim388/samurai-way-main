import { DialogsPageType } from "./redux-store";

const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
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
};

export const dialogsReducer = (
  state: DialogsPageType = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      if (action.newMessageText) {
        state.newMessageText = action.newMessageText;
      }
      return state;
    case SEND_MESSAGE:
      let message = {
        id: 6,
        message: state.newMessageText,
      };
      state.messages.push(message);
      state.newMessageText = "";
      return state;
    default:
      return state;
  }
};
type ActionTypes =
  | ReturnType<typeof updateNewMessageTextAC>
  | ReturnType<typeof sendMessageAC>;

export const updateNewMessageTextAC = (newMessageText: string) => {
  return {
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessageText,
  } as const;
};

export const sendMessageAC = () => {
  return {
    type: SEND_MESSAGE,
  } as const;
};
