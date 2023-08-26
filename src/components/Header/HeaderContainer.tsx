import React from "react";
import { Header } from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import { setAuthUserDataAC } from "../../reducers/auth-reducer";
import { StateType } from "../../redux/redux-store";

type MapStateToPropsType = {
  isAuth: boolean;
  login: string | null;
};
type MapDispatchToPropsType = {
  setUserData: (userId: string, email: string, login: string) => void;
};

type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: StateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};
const mapDispatchToProps: MapDispatchToPropsType = {
  setUserData: setAuthUserDataAC,
};

class HeaderAPIContainer extends React.Component<HeaderContainerPropsType> {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        if (!response.data.resultCode) {
          let { id, email, login } = response.data.data;
          this.props.setUserData(id, email, login);
        }
      });
  }

  render() {
    return <Header {...this.props} />;
  }
}

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderAPIContainer);
