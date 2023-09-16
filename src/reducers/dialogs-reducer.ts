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
};

export const dialogsReducer = (
  state: DialogsPageType = initialState,
  action: ActionTypes
): DialogsPageType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let message = {
        id: 6,
        message: action.newMessageText,
      };
      return {
        ...state,
        messages: [...state.messages, message],
      };
    default:
      return state;
  }
};
type ActionTypes = ReturnType<typeof sendMessageAC>;

export const sendMessageAC = (newMessageText: string) => {
  return {
    type: SEND_MESSAGE,
    newMessageText,
  } as const;
};
