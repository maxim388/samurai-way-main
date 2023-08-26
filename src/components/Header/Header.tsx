import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

export type HeaderPropsType = {
  isAuth: boolean;
  login: string | null;
};

export const Header: React.FC<HeaderPropsType> = ({ isAuth, login }) => {
  return (
    <header className={s.header}>
      <img
        alt={"logo"}
        src={
          "https://brand-hub.ru/uploads/file/1/6/c/16c8574cbeca0eb027120f24ce7b328f.png"
        }
      />
      <div className={s.loginBlock}>
        {isAuth ? login : <NavLink to={"/login"}>Login</NavLink>}
      </div>
    </header>
  );
};
