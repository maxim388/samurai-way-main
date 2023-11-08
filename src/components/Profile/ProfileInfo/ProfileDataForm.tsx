import { FC } from "react";
import { Input, Textarea, createField } from "../../common/FormsControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import { ProfileFormDataType } from "./ProfileInfo";
import s from "./ProfileInfo.module.css";
import style from "./../../common/FormsControls/FormsControls.module.css";

const ProfileDataForm: FC<InjectedFormProps<ProfileFormDataType>> = ({
  handleSubmit,
  error,
  //@ts-ignore
  profile,
}) => {
  let mapContacts;
  if (profile.contacts) {
    mapContacts = Object.keys(profile.contacts).map((key) => {
      //@ts-ignore
      return (
        <div className={s.contact} key={key}>
          <b>
            {key}: {createField(key, "contacts." + key, [], Input)}
          </b>
        </div>
      );
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
        {error && <div className={style.formSummaryError}>{error}</div>}
      </div>
      <div>
        <b>Full name: </b>
        {createField("Full name", "fullName", [], Input)}
      </div>
      <div>
        <b>Looking for a job: </b>
        {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
        <div>
          <b>My professional skills: </b>
          {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
        </div>
      </div>
      <div>
        <b>About me: </b>
        {createField("About me", "aboutMe", [], Textarea)}
      </div>
      <div>
        <b>Contacts: </b>
        {mapContacts}
      </div>
    </form>
  );
};

export const ProfileDataReduxForm = reduxForm<ProfileFormDataType>({
  form: "edit-profile",
})(ProfileDataForm);
