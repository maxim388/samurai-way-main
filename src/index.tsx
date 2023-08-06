import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/redux-store";
import { Provider, StoreContext } from "./StoreContext";

const rerenderEntireTree = () => {
  ReactDOM.render(
    <BrowserRouter>
      {/* <Provider store={store}>
        <App />
      </Provider> */}
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

rerenderEntireTree();
store.subscribe(() => {
  rerenderEntireTree();
});
