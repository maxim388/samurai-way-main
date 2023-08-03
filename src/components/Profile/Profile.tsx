import { PostDataType } from "../../redux/store";
import { MyPost } from "./MyPost/MyPost";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

export type ProfilePropsType = {
  posts: Array<PostDataType>;
  newPostText: string;
  dispatch: (action: any) => void;
};

export const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo />
      <MyPost
        posts={props.posts}
        dispatch={props.dispatch}
        newPostText={props.newPostText}
      />
    </div>
  );
};
