import s from "./Users.module.css";
import UserPhoto from "../../assets/users_default_img.jpg";
import React from "react";
import { UserType } from "../../redux/users-reducer";

type UserPropsType = {
  pages: number[];
  users: UserType[];
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

export const Users: React.FC<UserPropsType> = ({
  pages,
  users,
  currentPage,
  onPageChanged,
  unfollow,
  follow,
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
      {/* <button onClick={this.getUsers}>getUsers</button> */}
      {users.map((u) => {
        return (
          <div key={u.id}>
            <span>
              <div>
                <img
                  alt=""
                  src={u.photos.small !== null ? u.photos.small : UserPhoto}
                  className={s.ava}
                />
              </div>
              <div>
                {u.followed ? (
                  <button
                    onClick={() => {
                      unfollow(u.id);
                    }}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      follow(u.id);
                    }}
                  >
                    Unfollow
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
