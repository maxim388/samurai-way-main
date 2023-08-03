import s from "./Dialogs.module.css";
import { Mesassage } from "./Message/Message";
import { DialogItem } from "./DialogItem/DialogItem";
import { ChangeEvent } from "react";
import { DialogDataType, MessagesDataType} from "../../redux/store";
import { sendMessageAC, updateNewMessageTextAC } from "../../redux/dialogs-reducer";

export type DialogsPropsType = {
  messages: Array<MessagesDataType>;
  dialogs: Array<DialogDataType>;
  newMessageText: string;
  dispatch: (action: any) => void;
};

export const Dialogs = (props: DialogsPropsType) => {
  const gialogsElements = props.dialogs.map((d) => {
    return <DialogItem key={d.id} name={d.name} id={d.id} />;
  });
  const messagesElements = props.messages.map((m) => {
    return <Mesassage key={m.id} message={m.message} />;
  });

  const onSendMesageClick = () => {
    
    props.dispatch(sendMessageAC());
  }

  const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.dispatch(updateNewMessageTextAC(e.currentTarget.value));
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{gialogsElements}</div>
      <div className={s.messages}>
        <div> {messagesElements}</div>
        <div>
          <div>
            <textarea
              value={props.newMessageText}
              onChange={(e) => onNewMessageChange(e)}
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <button onClick={onSendMesageClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
