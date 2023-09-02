import { connect } from "react-redux";
import { addPostAC, updateNewPostTextAC } from "../../../reducers/profile-reducer";
import { StateType } from "../../../redux/redux-store";
import { MyPost } from "./MyPost";
import { Dispatch } from "redux";

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
