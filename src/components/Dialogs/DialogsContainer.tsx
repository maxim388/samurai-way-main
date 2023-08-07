import { connect } from "react-redux";
import {
  DialogDataType,
  MessagesDataType,
  sendMessageAC,
  updateNewMessageTextAC,
} from "../../redux/dialogs-reducer";
import { StateType } from "../../redux/redux-store";
import { Dialogs } from "./Dialogs";
import { Dispatch } from "redux";

type MapStatePropsType = {
  dialogs: Array<DialogDataType>;
  messages: Array<MessagesDataType>;
  newMessageText: string;
};

type MapDispatchToPropsType = {
  onSendMesageClick: () => void;
  onNewMessageChange: (message: string) => void;
};

export type DialogsPropsType = MapStatePropsType & MapDispatchToPropsType;

const mapStateToProps = (state: StateType): MapStatePropsType => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageText: state.dialogsPage.newMessageText,
  };
};
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    onSendMesageClick: () => {
      dispatch(sendMessageAC());
    },
    onNewMessageChange: (message: string) => {
      dispatch(updateNewMessageTextAC(message));
    },
  };
};

export const DialogsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialogs);
