import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Redirect, Route, Switch } from "react-router-dom";
// import { DialogsContainer } from "./components/Dialogs/DialogsContainer";
import { UsersContainer } from "./components/Users/UsersContainer";
// import { ProfileContainer } from "./components/Profile/ProfileContainer";
import { HeaderContainer } from "./components/Header/HeaderContainer";
import { LoginContainer } from "./components/Login/Login";
import { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { initializedSuccessTC } from "./reducers/app-reducer";
import { AppRootStateType } from "./redux/redux-store";
import { Preloader } from "./components/common/Preloader";
import { withSuspence } from "./HOC/withSuspence";

const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer"));

type MapStateToPropsType = {
  initialized: boolean;
};

type MapDispatchToPropsType = {
  initializedSuccess: () => void;
};

type AppContainerType = MapStateToPropsType & MapDispatchToPropsType;

const MapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    initialized: state.app.initialized,
  };
};

const MapDispatchToProps = {
  initializedSuccess: initializedSuccessTC,
};
export class AppContainer extends Component<AppContainerType> {
  catchAllUnhandledErrors = (promiseRejectionEvent: Event) => {
    alert("some error occured");
    // console.error(promiseRejectionEvent)
  };
  componentDidMount() {
    this.props.initializedSuccess();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className={"app-wrapper"}>
        <HeaderContainer />
        <Navbar />
        <div className={"app-wrapper-content"}>
          <Switch>
            <Route exact path={"/"} render={() => <Redirect to={"/profile"} />} />
            <Route path={"/profile/:userId?"} render={withSuspence(ProfileContainer)} />
            <Route path={"/dialogs"} render={withSuspence(DialogsContainer)} />
            <Route path={"/users"} render={() => <UsersContainer />} />
            <Route path={"/login"} render={() => <LoginContainer />} />
            <Route path={"/*"} render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export const App = connect(MapStateToProps, MapDispatchToProps)(AppContainer);
