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
    { id: 0, name: "Dimych" },
    { id: 1, name: "Andrew" },
    { id: 2, name: "Sveta" },
    { id: 3, name: "Sasha" },
    { id: 4, name: "Viktor" },
    { id: 5, name: "Valera" },
  ],
  messages: [
    { id: 0, message: "Hi" },
    { id: 1, message: "How is your it-kamasutra?" },
    { id: 2, message: "Yo" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
  ],
};

export const dialogsReducer = (
  state: DialogsPageType = initialState,
  action: ActionTypes
): DialogsPageType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let message = {
        id: state.messages.length,
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
