import { connect } from "react-redux";
import {
  DialogDataType,
  MessagesDataType,
  sendMessageAC,
} from "../../reducers/dialogs-reducer";
import { AppRootStateType } from "../../redux/redux-store";
import { Dialogs } from "./Dialogs";
import { Dispatch, compose } from "redux";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";

type MapStatePropsType = {
  dialogs: Array<DialogDataType>;
  messages: Array<MessagesDataType>;
};

type MapDispatchToPropsType = {
  onSendMesageClick: (newMessageText: string) => void;
};

export type DialogsPropsType = MapStatePropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  };
};
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    onSendMesageClick: (newMessageText: string) => {
      dispatch(sendMessageAC(newMessageText));
    },
  };
};

export const DialogsContainer = compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
