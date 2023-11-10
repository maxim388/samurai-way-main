import { UserProfileType } from "../../reducers/profile-reducer";
import { AppThunkType } from "../../redux/redux-store";
import { MyPostContainer } from "./MyPost/MyPostContainer";
import { ProfileFormDataType, ProfileInfo } from "./ProfileInfo/ProfileInfo";
import {FC} from "react";


type ProfilePropsType = {
  isOwner: boolean;
  // userId: number;
  profile: null | UserProfileType;
  status: string;
  updateStatusTC: (status: string) => AppThunkType;
  savePhotoTC: (file: File) => AppThunkType;
  saveProfileTC: (profile: ProfileFormDataType) => AppThunkType;
};

export const Profile: FC<ProfilePropsType> = (props) => {
  
  return (
    <div>
      <ProfileInfo {...props} />
      <MyPostContainer />
    </div>
  );
};
