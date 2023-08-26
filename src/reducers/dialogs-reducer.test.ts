import {
  DialogsPageType,
  dialogsReducer,
  sendMessageAC,
  updateNewMessageTextAC,
} from "./dialogs-reducer";

let startState: DialogsPageType;

beforeEach(() => {
  startState = {
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
});

test("correct new message title should be update | case UPDATE_NEW_MESSAGE_TEXT", () => {
  const action = updateNewMessageTextAC("Blabla");
  const endState = dialogsReducer(startState, action);

  expect(endState.newMessageText).toBe("Blabla");
  expect(endState.dialogs).toBe(startState.dialogs);
  expect(endState.messages).toBe(startState.messages);
});

test("correct new message should be added to the array messages| case SEND_MESSAGE", () => {
  const action = sendMessageAC();
  const endState = dialogsReducer(startState, action);

  expect(endState.newMessageText).toBe("");
  expect(endState.dialogs).toBe(startState.dialogs);
  expect(endState.messages).not.toBe(startState.messages);
  expect(endState.messages.length).toBe(6);
  expect(endState.messages[5].message).toBe(startState.newMessageText);
  expect(endState.messages[5].id).toBe(6);
});
