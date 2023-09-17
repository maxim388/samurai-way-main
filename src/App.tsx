import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Route } from "react-router-dom";
import { DialogsContainer } from "./components/Dialogs/DialogsContainer";
import { UsersContainer } from "./components/Users/UsersContainer";
import { ProfileContainer } from "./components/Profile/ProfileContainer";
import { HeaderContainer } from "./components/Header/HeaderContainer";
import { LoginContainer } from "./components/Login/Login";
import { Component } from "react";
import { connect } from "react-redux";
import { initializedSuccessTC } from "./reducers/app-reducer";
import { AppRootStateType } from "./redux/redux-store";
import { Preloader } from "./components/common/Preloader";

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
  componentDidMount() {
    this.props.initializedSuccess();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    } else {
      return (
        <div className={"app-wrapper"}>
          <HeaderContainer />
          <Navbar />
          <div className={"app-wrapper-content"}>
            <Route
              path={"/profile/:userId?"}
              render={() => <ProfileContainer />}
            />
            <Route path={"/dialogs"} render={() => <DialogsContainer />} />
            <Route path={"/users"} render={() => <UsersContainer />} />
            <Route path={"/login"} render={() => <LoginContainer />} />
          </div>
        </div>
      );
    }
  }
}

export const App = connect(MapStateToProps, MapDispatchToProps)(AppContainer);
