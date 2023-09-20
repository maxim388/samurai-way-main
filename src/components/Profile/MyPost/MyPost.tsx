import s from "./MyPost.module.css";
import { Post } from "./Post/Post";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { MyPostContainerPropsType } from "./MyPostContainer";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls";
import React, { memo } from "react";

type FormDataType = {
  newPostText: string;
};
const maxLength10 = maxLengthCreator(10);

// export class MyPost extends React.PureComponent<MyPostContainerPropsType> {
//   render() {
//     const addPost = (values: FormDataType) => {
//     this.props.addPost(values.newPostText);
//   };
//     return (
//       <div className={s.postBlock}>
//         <h3>My Post</h3>
//         <AddNewPostReduxForm onSubmit={addPost} />
//         <div className={s.posts}>
//           {this.props.posts.map((p) => {
//             return (
//               <Post key={p.id} message={p.message} likesCount={p.likesCount} />
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }

export const MyPost: React.FC<MyPostContainerPropsType> = memo((props) => {
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
});

const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name={"newPostText"}
          placeholder={"Post message"}
          validate={[required, maxLength10]}
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
