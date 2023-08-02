import { ChangeEvent } from "react";
import {
  PostDataType,
  addPostAC,
  updateNewPostTextAC,
} from "../../../redux/state";
import s from "./MyPost.module.css";
import { Post } from "./Post/Post";

export type MyPostPropsType = {
  posts: Array<PostDataType>;
  newPostText: string;
  dispatch: (action: any) => void;
};

export const MyPost = (props: MyPostPropsType) => {
  const addPost = () => {
    props.dispatch(addPostAC());
  };
  const updateNewPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.dispatch(updateNewPostTextAC(e.currentTarget.value));
  };

  return (
    <div className={s.postBlock}>
      <h3>My Post</h3>
      <div>
        <div>
          <textarea
            value={props.newPostText}
            onChange={(e) => updateNewPostText(e)}
          ></textarea>
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>
        {props.posts.map((p) => {
          return (
            <Post key={p.id} message={p.message} likesCount={p.likesCount} />
          );
        })}
      </div>
    </div>
  );
};
