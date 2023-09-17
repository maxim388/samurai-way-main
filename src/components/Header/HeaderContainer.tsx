import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import {
  authUserTC, logoutTC,
} from "../../reducers/auth-reducer";
import { AppRootStateType } from "../../redux/redux-store";

type MapStateToPropsType = {
  isAuth: boolean;
  login: string | null;
};
type MapDispatchToPropsType = {
  // auth: () => Function;
  logout: () => Function;
};

type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};
const mapDispatchToProps: MapDispatchToPropsType = {
  // auth: authUserTC,
  logout: logoutTC,
};
class HeaderAPIContainer extends React.Component<HeaderContainerPropsType> {
  // componentDidMount() {
  //   this.props.auth();
  // }
  render() {
    return <Header {...this.props} />;
  }
}

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderAPIContainer);
