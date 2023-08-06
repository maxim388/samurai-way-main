import { ChangeEvent } from "react";
import s from "./MyPost.module.css";
import { Post } from "./Post/Post";
import { addPostAC, updateNewPostTextAC } from "../../../redux/profile-reducer";
import { PostDataType } from "../../../redux/redux-store";


export type MyPostPropsType = {
  posts: Array<PostDataType>;
  newPostText: string;
  updateNewPostText: (text: string) => void;
  addPost: () => void;
};

export const MyPost = (props: MyPostPropsType) => {
  const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value;
    props.updateNewPostText(text);
  }
  return (
    <div className={s.postBlock}>
      <h3>My Post</h3>
      <div>
        <div>
          <textarea
            value={props.newPostText}
            onChange={(e) => onPostChange(e)}
          ></textarea>
        </div>
        <div>
          <button onClick={props.addPost}>Add post</button>
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
