import { MyPostContainer } from "./MyPost/MyPostContainer";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

export type ProfilePropsType = {};

export const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo />
      <MyPostContainer />
    </div>
  ); 
};
