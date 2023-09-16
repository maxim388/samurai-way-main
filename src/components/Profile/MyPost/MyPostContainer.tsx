import { connect } from "react-redux";
import { PostDataType, addPostAC } from "../../../reducers/profile-reducer";
import { StateType } from "../../../redux/redux-store";
import { MyPost } from "./MyPost";
import { Dispatch } from "redux";

type MapStateToPropsType = {
  posts: Array<PostDataType>;
};

type MapDispatchToPropsType = {
  addPost: (newPostText: string) => void;
};

export type MyPostContainerPropsType = MapStateToPropsType &
  MapDispatchToPropsType;

const mapStateToProps = (state: StateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    addPost: (newPostText: string) => {
      dispatch(addPostAC(newPostText));
    },
  };
};

export const MyPostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPost);
