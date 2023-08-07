import { UserType } from "../../redux/users-reducer";
import s from "./Users.module.css";

export type UsersPropsType = {
  users: Array<UserType>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setUsers: (users: Array<UserType>) => void;
};

export const Users = (props: UsersPropsType) => {
  if (!props.users.length) {
    props.setUsers([
      {
        id: 1,
        photoUrl:
          "https://n1s2.hsmedia.ru/1c/2d/db/1c2ddba2542202e3d5110fe28d026247/480x497_0xac120003_12278425171554311041.jpg",
        followed: false,
        fullName: "Dmitry",
        status: "I'm a boss",
        location: { city: "Minsk", country: "Belarus" },
      },
      {
        id: 2,
        photoUrl:
          "https://n1s2.hsmedia.ru/1c/2d/db/1c2ddba2542202e3d5110fe28d026247/480x497_0xac120003_12278425171554311041.jpg",
        followed: true,
        fullName: "Maxim",
        status: "I'm a boss)",
        location: { city: "Moskow", country: "Russia" },
      },
      {
        id: 3,
        photoUrl:
          "https://n1s2.hsmedia.ru/1c/2d/db/1c2ddba2542202e3d5110fe28d026247/480x497_0xac120003_12278425171554311041.jpg",
        followed: false,
        fullName: "Ilya",
        status: "I'm a boss too",
        location: { city: "Kiev", country: "Ukrain" },
      },
      {
        id: 4,
        photoUrl:
          "https://n1s2.hsmedia.ru/1c/2d/db/1c2ddba2542202e3d5110fe28d026247/480x497_0xac120003_12278425171554311041.jpg",
        followed: true,
        fullName: "Olga",
        status: "I'm a big boss",
        location: { city: "Minsk", country: "Belarus" },
      },
    ]);
    return <div>Loading</div>;
  } else {
    return (
      <div>
        {props.users.map((u) => {
          return (
            <div key={u.id}>
              <span>
                <div>
                  <img alt="" src={u.photoUrl} className={s.ava} />
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
                  <div>{u.fullName}</div>
                  <div>{u.status}</div>
                </span>
                <span>
                  <div>{u.location.city}</div>
                  <div>{u.location.country}</div>
                </span>
              </span>
            </div>
          );
        })}
      </div>
    );
  }
};
