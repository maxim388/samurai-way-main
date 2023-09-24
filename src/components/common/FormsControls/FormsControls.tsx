import { Field } from "redux-form";
import styles from "./FormsControls.module.css";
import { FC } from "react";

export const FormControl: FC<any> = ({ input, meta, ...restProps }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{restProps.children}</div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Input: FC<any> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export const Textarea: FC<any> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps}></textarea>
    </FormControl>
  );
};

export const createField = (
  placeholder: string,
  name: string,
  validators: Function[],
  component: FC<any>,
  restProps?: {},
  text?:string
) => {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...restProps}
      />{text}
    </div>
  );
};
