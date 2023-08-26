import s from "./Users.module.css";
import UserPhoto from "../../assets/users_default_img.jpg";
import React from "react";
import { UserType } from "../../reducers/users-reducer";
import { NavLink } from "react-router-dom";
import axios from "axios";

type UserPropsType = {
  pages: number[];
  users: UserType[];
  currentPage: number;
  isFetching: boolean;
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
                    onClick={() => {
                      axios
                        .delete(
                          `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                          {
                            headers: {
                              "API-KEY": "41b0e7ee-a396-4123-8fc6-d9277f02bce7",
                            },
                            withCredentials: true,
                          }
                        )

                        .then((response) => {
                          if (!response.data.resultCode) {
                            unfollow(u.id);
                          }
                        });
                    }}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      axios
                        .post(
                          `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                          {},
                          {
                            headers: {
                              "API-KEY": "41b0e7ee-a396-4123-8fc6-d9277f02bce7",
                            },
                            withCredentials: true,
                          }
                        )
                        .then((response) => {
                          if (!response.data.resultCode) {
                            follow(u.id);
                          }
                        });
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
