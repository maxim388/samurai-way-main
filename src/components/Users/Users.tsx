import axios from "axios";
import s from "./Users.module.css";
import UserPhoto from "../../assets/users_default_img.jpg";
import React from "react";
import { UsersPropsType } from "./UsersContainer";

export class Users extends React.Component<UsersPropsType> {
  componentDidMount(): void {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  }
  render() {
    return (
      <div>
        {/* <button onClick={this.getUsers}>getUsers</button> */}
        {this.props.users.map((u) => {
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
                        this.props.unfollow(u.id);
                      }}
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        this.props.follow(u.id);
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
  }
}
