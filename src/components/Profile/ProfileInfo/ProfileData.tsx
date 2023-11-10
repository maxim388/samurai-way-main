import { FC } from "react";
import { UserProfileType } from "../../../reducers/profile-reducer";
import { Contact } from "./Contacts";

type ProfileDataType = {
  profile: UserProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};

export const ProfileData: FC<ProfileDataType> = ({
  profile,
  isOwner,
  goToEditMode,
}) => {
  let mapContacts;
  if (profile.contacts) {
    mapContacts = Object.keys(profile.contacts).map((key) => {
      //@ts-ignore
      return <Contact key={key} title={key} value={profile.contacts[key]} />;
    });
  }
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}
      <div>
        <b>Full name: </b>
        {profile.fullName}
      </div>
      <div>
        <b>Looking for a job: </b>
        {profile.lookingForAJob ? "yes" : "no"}
        {profile.lookingForAJob && (
          <div>
            <b>My professional skills: </b>
            {profile.lookingForAJobDescription}
          </div>
        )}
      </div>
      <div>
        <b>About me: </b>
        {profile.aboutMe}
      </div>
      <div>
        <b>Contacts: </b>
        {mapContacts}
      </div>
    </div>
  );
};
