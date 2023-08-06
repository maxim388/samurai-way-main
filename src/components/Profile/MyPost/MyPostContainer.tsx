import { StoreContext } from "../../../StoreContext";
import { addPostAC, updateNewPostTextAC } from "../../../redux/profile-reducer";
import { StoreType } from "../../../redux/redux-store";
import { MyPost } from "./MyPost";

export type MyPostContainerPropsType = {
  // store: StoreType;
};

export const MyPostContainer = (props: MyPostContainerPropsType) => {
  
  return (
    <StoreContext.Consumer>
      {(store) => {
        const state = store.getState();

        const updateNewPostText = (text: string) => {
          store.dispatch(updateNewPostTextAC(text));
        };

        const addPost = () => {
          store.dispatch(addPostAC());
        };

        return (
          <MyPost
            updateNewPostText={updateNewPostText}
            addPost={addPost}
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};
