const UPDATE_NEW_MESSAGE_TEXT = "UPDATE_NEW_MESSAGE_TEXT";
const SEND_MESSAGE = "SEND_MESSAGE";

export type DialogDataType = {
  id: number;
  name: string;
};

export type MessagesDataType = {
  id: number;
  message: string;
};

export type DialogsPageType = {
  dialogs: Array<DialogDataType>;
  messages: Array<MessagesDataType>;
  newMessageText: string;
};

const initialState = {
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
): DialogsPageType => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      if (action.newMessageText) {
        return {
          ...state,
          newMessageText: action.newMessageText,
        };
      } else {
        return state;
      }
    case SEND_MESSAGE:
      let message = {
        id: 6,
        message: state.newMessageText,
      };
      return {
        ...state,
        messages: [...state.messages, message],
        newMessageText: "",
      };
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
