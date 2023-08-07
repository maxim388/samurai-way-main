import { connect } from "react-redux";
import {
  sendMessageAC,
  updateNewMessageTextAC,
} from "../../redux/dialogs-reducer";
import { StateType } from "../../redux/redux-store";
import { Dialogs } from "./Dialogs";
import { Dispatch } from "redux";

export type DialogsContainerPropsType = {};

const mapStateToProps = (state: StateType) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageText: state.dialogsPage.newMessageText,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
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
