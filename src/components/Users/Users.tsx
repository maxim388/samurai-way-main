import s from "./Users.module.css";
import UserPhoto from "../../assets/users_default_img.jpg";
import { FC } from "react";
import { UserType } from "../../reducers/users-reducer";
import { NavLink } from "react-router-dom";
import { Paginator } from "./Paginator/Paginator";

type UsersPropsType = {
  pageSize: number;
  users: UserType[];
  currentPage: number;
  followingInProgress: boolean;
  totalUsersCount: number;
  onPageChanged: (pageNumber: number) => void;
  toggleFollowTC: (userId: number, follow: boolean) => Function;
};

export const Users: FC<UsersPropsType> = ({
  pageSize,
  users,
  currentPage,
  onPageChanged,
  followingInProgress,
  toggleFollowTC,
  totalUsersCount,
}) => {

  const usersMaping = users.map((u) => {
    return (
      <div key={u.id}>
        <span>
          <div>
            <NavLink to={`/profile/${u.id}`}>
              <img
                alt="ava"
                src={u.photos.small !== null ? u.photos.small : UserPhoto}
                className={s.ava}
              />
            </NavLink>
          </div>
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
      <Paginator
        onPageChanged={onPageChanged}
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div>{usersMaping}</div>
    </div>
  );
};
