import { connect } from "react-redux";
import { StoreContext } from "../../../StoreContext";
import { addPostAC, updateNewPostTextAC } from "../../../redux/profile-reducer";
import { StateType, StoreType } from "../../../redux/redux-store";
import { MyPost } from "./MyPost";
import { Dispatch } from "redux";

export type MyPostContainerPropsType = {
  // store: StoreType;
};

// export const MyPostContainer = (props: MyPostContainerPropsType) => {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         const state = store.getState();

//         const updateNewPostText = (text: string) => {
//           store.dispatch(updateNewPostTextAC(text));
//         };

//         const addPost = () => {
//           store.dispatch(addPostAC());
//         };

//         return (
//           <MyPost
//             posts={state.profilePage.posts}
//             newPostText={state.profilePage.newPostText}
//             updateNewPostText={updateNewPostText}
//             addPost={addPost}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

const mapStateToProps = (state: StateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateNewPostText: (text: string) => {
      dispatch(updateNewPostTextAC(text));
    },
    addPost: () => {
      dispatch(addPostAC());
    },
  };
};

export const MyPostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPost);
