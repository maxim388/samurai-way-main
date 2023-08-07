import axios from "axios";
import { UserType } from "../../redux/users-reducer";
import s from "./Users.module.css";
import UserPhoto from "../../assets/users_default_img.jpg"

export type UsersPropsType = {
  users: Array<UserType>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setUsers: (users: Array<UserType>) => void;
};

export const Users = (props: UsersPropsType) => {
  if (!props.users.length) {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((response) => {
        props.setUsers(
          response.data.items
          
        );
      });

    return <div>Loading</div>;
  } else {
    return (
      <div>
        {props.users.map((u) => {
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
                        props.unfollow(u.id);
                      }}
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        props.follow(u.id);
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
                <span>
                  <div>{"u.location.city"}</div>
                  <div>{"u.location.country"}</div>
                </span>
              </span>
            </div>
          );
        })}
      </div>
    );
  }
};
