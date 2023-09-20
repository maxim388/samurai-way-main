import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import { FC } from "react";

export type HeaderPropsType = {
  isAuth: boolean;
  login: string | null;
  logout: () => Function
};

export const Header: FC<HeaderPropsType> = ({ isAuth, login, logout }) => {
  return (
    <header className={s.header}>
      <img
        alt={"logo"}
        src={
          "https://brand-hub.ru/uploads/file/1/6/c/16c8574cbeca0eb027120f24ce7b328f.png"
        }
      />
      <div className={s.loginBlock}>
        {isAuth ? (
          <div>
            {login} -- <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};
