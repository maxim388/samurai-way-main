import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";

type FormDataType = {
  login: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"Login"} component={"input"} name={"login"} />
      </div>
      <div>
        <Field placeholder={"Password"} component={"input"} name={"password"} />
      </div>
      <div>
        <Field type="checkbox" component={"input"} name={"remember me"} />
        rememver me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

export const Login = () => {
  const onSubmit = (formData: FormDataType) => {};
  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const LoginReduxForm = reduxForm<FormDataType>({
  form: "login",
})(LoginForm);
