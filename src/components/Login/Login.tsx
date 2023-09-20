import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { loginTC } from "../../reducers/auth-reducer";
import { Redirect } from "react-router-dom";
import { AppRootStateType } from "../../redux/redux-store";
import { Captcha } from "./Captcha";
import style from "./../common/FormsControls.module.css";

type FormDataType = {
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

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"email"}
          component={Input}
          name={"email"}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder={"password"}
          component={Input}
          name={"password"}
          type={"password"}
          validate={[required]}
        />
      </div>
      <div>
        <Field type="checkbox" component={Input} name={"rememberMe"} />
        rememver me
      </div>
      {props.error && (
        <div className={style.formSummaryError}>{props.error}</div>
      )}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<FormDataType>({
  form: "login",
})(LoginForm);

export const Login: React.FC<LoginPropsType> = (props) => {
  const onSubmit = (formData: FormDataType) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };
  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div>
      <h1>LOGIN</h1>

      {!props.captcha ? (
        <LoginReduxForm onSubmit={onSubmit} />
      ) : (
        <Captcha captcha={props.captcha} />
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
