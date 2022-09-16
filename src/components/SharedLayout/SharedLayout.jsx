import styles from './SharedLayout.module.css';
import { NavLink, Outlet } from 'react-router-dom';

export const SharedLayout = props => {
  return (
    <>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li>
            <NavLink to="/" className={styles.navLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={styles.navLink}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
