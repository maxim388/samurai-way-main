import s from "./MyPost.module.css";
import { Post } from "./Post/Post";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { MyPostContainerPropsType } from "./MyPostContainer";

type FormDataType = {
  newPostText: string;
};

export const MyPost = (props: MyPostContainerPropsType) => {

  const addPost = (values: FormDataType) => {
    props.addPost(values.newPostText);
  };
  return (
    <div className={s.postBlock}>
      <h3>My Post</h3>
      <AddNewPostReduxForm onSubmit={addPost} />
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

const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={"textarea"}
          name={"newPostText"}
          placeholder={"Enter your post"}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostReduxForm = reduxForm<FormDataType>({
  form: "profileAddNewPostForm",
})(AddNewPostForm);
