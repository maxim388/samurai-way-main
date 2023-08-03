import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Header } from "./components/Header/Header";
import { Profile } from "./components/Profile/Profile";
import { Route } from "react-router-dom";
import { Dialogs } from "./components/Dialogs/Dialogs";
import { StateType } from "./redux/store";

export type AppPropsType = {
  state: StateType;
  dispatch: (action: any) => void;
};

export const App = (props: AppPropsType) => {
  return (
    <div className={"app-wrapper"}>
      <Header />
      <Navbar />
      <div className={"app-wrapper-content"}>
        <Route
          path={"/profile"}
          render={() => (
            <Profile
              posts={props.state.profilePage.posts}
              newPostText={props.state.profilePage.newPostText}
              dispatch={props.dispatch}
            />
          )}
        />
        <Route
          path={"/dialogs"}
          render={() => (
            <Dialogs
              messages={props.state.dialogsPage.messages}
              dialogs={props.state.dialogsPage.dialogs}
              newMessageText={props.state.dialogsPage.newMessageText}
              dispatch={props.dispatch}
            />
          )}
        />
      </div>
    </div>
  );
};

export default App;
