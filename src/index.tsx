import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { store } from "./redux/redux-store";
import { Provider } from "react-redux";

ReactDOM.render(
  // <HashRouter >
  <BrowserRouter>
   <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  // </HashRouter>,
  document.getElementById("root")
);
