import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { loginTC } from "../../reducers/auth-reducer";
import { Redirect } from "react-router-dom";
import { AppRootStateType } from "../../redux/redux-store";
import { Captcha } from "./Captcha";
import style from "./../common/FormsControls/FormsControls.module.css";
import { Input, createField } from "../common/FormsControls/FormsControls";
import { FC } from "react";

type LoginFormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
type MapStateToPropsType = {
  isAuth: boolean;
  captcha: string;
};
type MapDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean) => Function;
};
type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType;

const LoginForm: FC<InjectedFormProps<LoginFormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createField("email", "email", [required], Input)}
      {createField("password", "password", [required], Input, { type: "password" })}
      {createField("", "rememberMe", [], Input, { type: "checkbox" }, "remember me")}

      {props.error && <div className={style.formSummaryError}>{props.error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormDataType>({
  form: "login",
})(LoginForm);

export const Login: FC<LoginPropsType> = ({ login, captcha, isAuth }) => {
  const onSubmit = (formData: LoginFormDataType) => {
    login(formData.email, formData.password, formData.rememberMe);
  };
  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div>
      <h1>LOGIN</h1>

      {!captcha ? (
        <LoginReduxForm onSubmit={onSubmit} />
      ) : (
        <Captcha captcha={captcha} />
      )}
    </div>
  );
};
const MapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha,
  };
};
const mapDispatchToProps: MapDispatchToPropsType = {
  login: loginTC,
};

export const LoginContainer = connect(
  MapStateToProps,
  mapDispatchToProps
)(Login);
