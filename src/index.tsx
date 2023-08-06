import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { RootStateType, store } from "./redux/redux-store";

const rerenderEntireTree = (state: RootStateType) => {
  ReactDOM.render(
    <BrowserRouter>
      <App store={store} state={state} dispatch={store.dispatch.bind(store)} />
    </BrowserRouter>,
    document.getElementById("root")
  );
};

rerenderEntireTree(store.getState());
store.subscribe(() => {
  console.log("2");
  const state = store.getState();
  // let state = {
  //   profilePage: {
  //     posts: [
  //       { id: 1, message: "Hi! How are you?", likesCount: 12 },
  //       { id: 2, message: "It's my first post", likesCount: 11 },
  //       { id: 3, message: "Blabla", likesCount: 11 },
  //       { id: 4, message: "Dada", likesCount: 11 },
  //     ],
  //     newPostText: "",
  //   },
  //   dialogsPage: {
  //     dialogs: [
  //       { id: 1, name: "Dimych" },
  //       { id: 2, name: "Andrew" },
  //       { id: 3, name: "Sveta" },
  //       { id: 4, name: "Sasha" },
  //       { id: 5, name: "Viktor" },
  //       { id: 6, name: "Valera" },
  //     ],
  //     messages: [
  //       { id: 1, message: "Hi" },
  //       { id: 2, message: "How is your it-kamasutra?" },
  //       { id: 3, message: "Yo" },
  //       { id: 4, message: "Yo" },
  //       { id: 5, message: "Yo" },
  //     ],
  //     newMessageText: "",
  //   },
  // };
  rerenderEntireTree(state);
});
