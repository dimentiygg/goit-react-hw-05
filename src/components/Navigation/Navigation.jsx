import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  const activeLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.activeLink);
  };

  return (
    <header className={css.header}>
      <nav>
        <ul className={css.navList}>
          <li>
            <NavLink to="/" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={activeLink}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
