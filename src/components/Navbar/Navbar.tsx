import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";
export type NavbarPropsType = {};

export const Navbar = (props: NavbarPropsType) => {
  return (
    <nav className={s.nav}>
      <div className={`${s.item}`}>
        <NavLink to="/profile" activeClassName={s.activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" activeClassName={s.activeLink}>
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" activeClassName={s.activeLink}>
          News
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" activeClassName={s.activeLink}>
          Music
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/setings" activeClassName={s.activeLink}>
          Settings
        </NavLink>
      </div>
    </nav>
  );
};
