import { connect } from "react-redux";
import { StoreContext } from "../../StoreContext";
import {
  sendMessageAC,
  updateNewMessageTextAC,
} from "../../redux/dialogs-reducer";
import { StateType, StoreType } from "../../redux/redux-store";
import { Dialogs } from "./Dialogs";
import { Dispatch } from "redux";

export type DialogsContainerPropsType = {
  // store: StoreType;
};

// export const DialogsContainer = (props: DialogsContainerPropsType) => {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         const state = store.getState();

//         const onSendMesageClick = () => {
//           store.dispatch(sendMessageAC());
//         };

//         const onNewMessageChange = (message: string) => {
//           store.dispatch(updateNewMessageTextAC(message));
//         };

//         return (
//           <Dialogs
//             dialogs={state.dialogsPage.dialogs}
//             messages={state.dialogsPage.messages}
//             newMessageText={state.dialogsPage.newMessageText}
//             onSendMesageClick={onSendMesageClick}
//             onNewMessageChange={onNewMessageChange}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

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
