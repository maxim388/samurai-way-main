import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Header } from "./components/Header/Header";
import { Profile } from "./components/Profile/Profile";
import { Route } from "react-router-dom";
import { DialogsContainer } from "./components/Dialogs/DialogsContainer";
import { Dispatch } from "redux";

export type AppPropsType = {};

export const App = (props: AppPropsType) => {
  return ( 
    <div className={"app-wrapper"}>
      <Header />
      <Navbar />
      <div className={"app-wrapper-content"}>
        <Route path={"/profile"} render={() => <Profile />} />
        <Route path={"/dialogs"} render={() => <DialogsContainer />} />
      </div>
    </div>
  );
};
