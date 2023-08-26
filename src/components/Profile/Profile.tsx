import { UserProfileType } from "../../reducers/profile-reducer";
import { MyPostContainer } from "./MyPost/MyPostContainer";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

type ProfilePropsType = {
  profile: null | UserProfileType;
};

export const Profile: React.FC<ProfilePropsType> = ({ profile }) => {
  return (
    <div>
      <ProfileInfo profile={profile} />
      <MyPostContainer />
    </div>
  );
};
