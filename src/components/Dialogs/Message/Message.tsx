import s from "./../Dialogs.module.css";

export type MessagePropsType = {
  message: string;
};

export const Mesassage = (props: MessagePropsType) => {
  return <div className={s.message}>{props.message}</div>;
};
