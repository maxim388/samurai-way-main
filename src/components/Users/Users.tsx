import s from "./Users.module.css";
import UserPhoto from "../../assets/users_default_img.jpg";
import React from "react";
import { UserType } from "../../reducers/users-reducer";
import { NavLink } from "react-router-dom";

type UserPropsType = {
  pages: number[];
  users: UserType[];
  currentPage: number;
  followingInProgress: boolean;
  onPageChanged: (pageNumber: number) => void;
  unfollowTC: (userId: number) => Function;
  followTC: (userId: number) => Function;
};

export const Users: React.FC<UserPropsType> = ({
  pages,
  users,
  currentPage,
  onPageChanged,
  followingInProgress,
  unfollowTC,
  followTC,
}) => {
  return (
    <div>
      <div>
        {pages.map((p) => {
          return (
            <span
              className={currentPage === p ? s.selectedPage : ""}
              onClick={() => onPageChanged(p)}
            >
              {p}
            </span>
          );
        })}
      </div>
      {users.map((u) => {
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
                      unfollowTC(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={followingInProgress}
                    onClick={() => {
                      followTC(u.id);
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
      })}
    </div>
  );
};
