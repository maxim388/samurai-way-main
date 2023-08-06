import { PostDataType } from "../../redux/redux-store";
import { MyPost } from "./MyPost/MyPost";
import { MyPostContainer } from "./MyPost/MyPostContainer";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

export type ProfilePropsType = {
  // posts: Array<PostDataType>;
  // newPostText: string;
  // dispatch: (action: any) => void;
  store: any;
};

export const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo />
      <MyPostContainer
        store={props.store}
        // posts={props.posts}
        // dispatch={props.dispatch}
        // newPostText={props.newPostText}
      />
      {/* <MyPostContainer
        posts={props.posts}
        dispatch={props.dispatch}
        newPostText={props.newPostText}
      /> */}
    </div>
  );
};
