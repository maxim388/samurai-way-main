import styles from "./FormsControls.module.css";

export const FormControl: React.FC<any> = ({ input, meta, ...restProps }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>
        {restProps.children}
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Input: React.FC<any> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export const Textarea: React.FC<any> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps}></textarea>
    </FormControl>
  );
};
