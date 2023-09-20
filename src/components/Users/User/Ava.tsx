import { FC } from "react";
import { NavLink } from "react-router-dom";
import UserPhoto from "../../assets/users_default_img.jpg";
import styles from "./Users.module.css";
import { UserType } from "../../../reducers/users-reducer";

type AvaPropsType = {
  user: UserType;
};

export const Ava: FC<AvaPropsType> = ({ user }) => {
  return (
    <div>
      <NavLink to={`/profile/${user.id}`}>
        <img
          alt="ava"
          src={user.photos.small !== null ? user.photos.small : UserPhoto}
          className={styles.ava}
        />
      </NavLink>
    </div>
  );
};
