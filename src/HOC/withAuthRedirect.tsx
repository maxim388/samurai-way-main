import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppRootStateType } from "../redux/redux-store";

type MapStateToPropsType = {
  isAuth: boolean;
};

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export function withAuthRedirect <T> (Component: React.ComponentType<T>) {
  const RedirectComponent = (props: MapStateToPropsType) => {
    let { isAuth, ...restProps } = props;
    if (!props.isAuth) return <Redirect to={"/login"} />;
    return <Component {...(restProps as T)} />; //IntrinsicAttributes
  };
  return connect(mapStateToProps)(RedirectComponent);
};
