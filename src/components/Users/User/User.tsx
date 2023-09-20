

import { FC } from "react";
import { UserType } from "../../../reducers/users-reducer";
import { Ava } from "./Ava";

type UserPropsType = {
  users: UserType[];
  followingInProgress: boolean;
  toggleFollowTC: (userId: number, follow: boolean) => Function;
};

export const Users: FC<UserPropsType> = ({
  users,
  followingInProgress,
  toggleFollowTC,
}) => {
  const usersMaping = users.map((u) => {
    return (
      <div key={u.id}>
        <span>
          <Ava user={u}/>
          {/* <div>
            <NavLink to={`/profile/${u.id}`}>
              <img
                alt="ava"
                src={u.photos.small !== null ? u.photos.small : UserPhoto}
                className={s.ava}
              />
            </NavLink>
          </div> */}
          <div>
            {u.followed ? (
              <button
                disabled={followingInProgress}
                onClick={() => {
                  toggleFollowTC(u.id, false);
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                disabled={followingInProgress}
                onClick={() => {
                  toggleFollowTC(u.id, true);
                }}
              >
                Follow
              </button>
            )}
          </div>
        </span>
        <span>
          <span>
            <div>{u.name}</div>
            <div>{u.status}</div>
          </span>
          <span></span>
        </span>
      </div>
    );
  });

  return (
    <div>
      <div>{usersMaping}</div>
    </div>
  );
};
