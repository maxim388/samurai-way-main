import { UserProfileType } from "../../reducers/profile-reducer";
import { MyPostContainer } from "./MyPost/MyPostContainer";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

type ProfilePropsType = {
  profile: null | UserProfileType;
  status: string;
  updateStatusTC: (status: string) => Function;
};

export const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div>
      <ProfileInfo {...props} />
      <MyPostContainer />
    </div>
  );
};
