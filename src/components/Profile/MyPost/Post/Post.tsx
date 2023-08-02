import s from "./Post.module.css";

export type PostPropsType = {
  message: string;
  likesCount: number;
};

export const Post = (props: PostPropsType) => {
  return (
    <div className={s.item}>
      <img
        alt={"avatar"}
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYGPsjyMt1h-2yQhEh-bxGUvIpz6SSfEsVSf27WgwCkaCaNr9WSpVx78g&usqp=CAU"
        }
      />
      {props.message}
      <div>
        <span>Like: {props.likesCount}</span>
      </div>
    </div>
  );
};
