import s from "./Dialogs.module.css";
import { Mesassage } from "./Message/Message";
import { DialogItem } from "./DialogItem/DialogItem";
import { DialogDataType, MessagesDataType } from "../../redux/state";

export type DialogsPropsType = {
  messages: Array<MessagesDataType>;
  dialogs: Array<DialogDataType>;
};

export const Dialogs = (props: DialogsPropsType) => {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {props.dialogs.map((d) => {
          return <DialogItem key={d.id} name={d.name} id={d.id} />;
        })}
      </div>
      <div className={s.messages}>
        {props.messages.map((m) => {
          return <Mesassage key={m.id} message={m.message} />;
        })}
      </div>
    </div>
  );
};
