import s from "./Dialogs.module.css";
import { Mesassage } from "./Message/Message";
import { DialogItem } from "./DialogItem/DialogItem";
import { DialogsPropsType } from "./DialogsContainer";
import { Field, InjectedFormProps, reduxForm } from "redux-form";

type FormDataType = {
  newMessageText: string;
};

const AddMeessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={"textarea"}
          name={"newMessageText"}
          placeholder={"Enter your message"}
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

export const Dialogs = (props: DialogsPropsType) => {
  const gialogsElements = props.dialogs.map((d) => {
    return <DialogItem key={d.id} name={d.name} id={d.id} />;
  });
  const messagesElements = props.messages.map((m) => {
    return <Mesassage key={m.id} message={m.message} />;
  });

  const addNewMessage = (values: FormDataType) => {
    props.onSendMesageClick(values.newMessageText);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{gialogsElements}</div>
      <div className={s.messages}>
        <div> {messagesElements}</div>
        <AddMeessageFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

const AddMeessageFormRedux = reduxForm<FormDataType>({
  form: "dialogAddMessageForm",
})(AddMeessageForm);
