import { InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { loginTC } from "../../reducers/auth-reducer";
import { Redirect } from "react-router-dom";
import { AppRootStateType } from "../../redux/redux-store";
import style from "./../common/FormsControls/FormsControls.module.css";
import { Input, createField } from "../common/FormsControls/FormsControls";
import { FC } from "react";

type LoginFormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null;
};
type MapStateToPropsType = {
  isAuth: boolean;
  captcha: string;
};
type MapDispatchToPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) => Function;
};
type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType;

const LoginForm: FC<InjectedFormProps<LoginFormDataType>> = ({
  handleSubmit,
  error,
  //@ts-ignore
  captcha,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField("email", "email", [required], Input)}
      {createField("password", "password", [required], Input, { type: "password" })}
      {createField("", "rememberMe", [], Input, { type: "checkbox" }, "remember me")}

      {captcha && <img src={captcha} alt="captcha" />}
      {captcha && createField("Symbol from image", "captcha", [required], Input, {})}
      {error && <div className={style.formSummaryError}>{error}</div>}
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
    const { email, password, rememberMe, captcha } = formData;
    login(email, password, rememberMe, captcha);
  };
  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div>
      <h1>LOGIN</h1>
      {/* @ts-ignore */}
      <LoginReduxForm onSubmit={onSubmit} captcha={captcha} />
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

export const LoginContainer = connect(MapStateToProps, mapDispatchToProps)(Login);
