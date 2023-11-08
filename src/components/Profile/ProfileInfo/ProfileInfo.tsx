import { UserProfileType } from "../../../reducers/profile-reducer";
import { Preloader } from "../../common/Preloader";
import s from "./ProfileInfo.module.css";
import { ProfileStatusWithHooks } from "./ProfileStatusWithHooks";
import { ChangeEvent, FC, useState } from "react";
import UserPhoto from "../../../assets/users_default_img.jpg";
import { ProfileDataReduxForm } from "./ProfileDataForm";
import { ProfileData } from "./ProfileData";
import { AppThunkType } from "../../../redux/redux-store";

type ProfileInfoPropsType = {
  isOwner: boolean;
  profile: null | UserProfileType;
  status: string;
  updateStatusTC: (status: string) => AppThunkType;
  savePhotoTC: (file: File) => AppThunkType;
  saveProfileTC: (profile: ProfileFormDataType) => AppThunkType;
};

export type ProfileFormDataType = {
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  aboutMe: string;
};

export const ProfileInfo: FC<ProfileInfoPropsType> = ({
  isOwner,
  profile,
  status,
  updateStatusTC,
  savePhotoTC,
  saveProfileTC,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  if (!profile) {
    return <Preloader />;
  }
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhotoTC(e.target.files[0]);
    }
  };
  const onSubmit = (formData: ProfileFormDataType) => {
    saveProfileTC(formData);
    setEditMode(false);
    //todo handleError in form
  };

  return (
    <div>
      <div className={s.desctiptionBlock}>
        <img src={profile?.photos?.large || UserPhoto} alt="ava" className={s.mainPhoto} />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        {editMode ? (
          <ProfileDataReduxForm
            onSubmit={onSubmit}
            initialValues={profile}
            //@ts-ignore
            profile={profile}
          />
        ) : (
          <ProfileData profile={profile} isOwner goToEditMode={() => setEditMode(true)} />
        )}

        <ProfileStatusWithHooks status={status} updateStatusTC={updateStatusTC} />
      </div>
    </div>
  );
};
