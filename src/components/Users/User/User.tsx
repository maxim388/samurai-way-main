import { FC } from "react";
import { UserType } from "../../../reducers/users-reducer";
import { Ava } from "./Ava";
import { MyButton } from "./MyButton";

type UserPropsType = {
  user: UserType;
  followingInProgress: boolean;
  toggleFollowTC: (userId: number, follow: boolean) => Function;
};

export const User: FC<UserPropsType> = ({
  user,
  followingInProgress,
  toggleFollowTC,
}) => {
  return (
    <div key={user.id}>
      <span>
        <Ava user={user} />
        <div>
          <MyButton
            followed={user.followed}
            userId={user.id}
            toggleFollowTC={toggleFollowTC}
            followingInProgress={followingInProgress}
          >
            {user.followed ? "Unfollow" : "Follow"}
          </MyButton>
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
      </span>
    </div>
  );
};
