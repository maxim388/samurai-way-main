import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import {
  authThunkCreator,
} from "../../reducers/auth-reducer";
import { StateType } from "../../redux/redux-store";

type MapStateToPropsType = {
  isAuth: boolean;
  login: string | null;
};
type MapDispatchToPropsType = {
  authTC: () => Function;
};

type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: StateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};
const mapDispatchToProps: MapDispatchToPropsType = {
  authTC: authThunkCreator,
};
class HeaderAPIContainer extends React.Component<HeaderContainerPropsType> {
  componentDidMount() {
    this.props.authTC();
  }
  render() {
    return <Header {...this.props} />;
  }
}

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderAPIContainer);
