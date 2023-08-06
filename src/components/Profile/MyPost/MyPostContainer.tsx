import { addPostAC, updateNewPostTextAC } from "../../../redux/profile-reducer";
import { StoreType } from "../../../redux/redux-store";
import { MyPost } from "./MyPost";

export type MyPostContainerPropsType = {
  store: StoreType;
};

export const MyPostContainer = (props: MyPostContainerPropsType) => {
  const state = props.store.getState(); 

  const updateNewPostText = (text: string) => {
    props.store.dispatch(updateNewPostTextAC(text));
  };
  const addPost = () => {
    props.store.dispatch(addPostAC());
  };
  return (
    <MyPost
      updateNewPostText={updateNewPostText}
      addPost={addPost}
      posts={state.profilePage.posts}
      newPostText={state.profilePage.newPostText}
    />
  );
};
