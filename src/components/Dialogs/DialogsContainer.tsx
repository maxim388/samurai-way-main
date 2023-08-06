import {
  sendMessageAC,
  updateNewMessageTextAC,
} from "../../redux/dialogs-reducer";
import { StoreType } from "../../redux/redux-store";
import { Dialogs } from "./Dialogs";

export type DialogsContainerPropsType = {
  store: StoreType;
};

export const DialogsContainer = (props: DialogsContainerPropsType) => {
  const state = props.store.getState();

  const onSendMesageClick = () => {
    props.store.dispatch(sendMessageAC());
  };

  const onNewMessageChange = (message: string) => {
    props.store.dispatch(updateNewMessageTextAC(message));
  };

  return (
    <Dialogs
      dialogs={state.dialogsPage.dialogs}
      messages={state.dialogsPage.messages}
      newMessageText={state.dialogsPage.newMessageText}
      onSendMesageClick={onSendMesageClick}
      onNewMessageChange={onNewMessageChange}
    />
  );
};
