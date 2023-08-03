const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE";

export const dialogsReducer = (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageText = action.newMessageText;
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



export const updateNewMessageTextAC = (newMessageText: string) => {
  return {
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessageText,
  };
};

export const sendMessageAC = () => {
  return {
    type: SEND_MESSAGE,
  };
};

