import { Link } from 'react-router-dom';
import styles from './MoviesList.module.css';
import PropTypes from 'prop-types';

export const MoviesList = ({ moviesData, location }) => {
  return (
    <ul className={styles.movieList}>
      {moviesData.map(({ original_title, name, id, poster_path }) => {
        return (
          <li key={id}>
            <Link
              to={
                location.pathname === '/'
                  ? `movies/${JSON.stringify(id)}`
                  : JSON.stringify(id)
              }
              state={{ from: location }}
              className={styles.movieLink}
            >
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w400${poster_path}`
                    : 'https://sd.keepcalms.com/i/keep-calm-poster-not-found.png'
                }
                alt=""
                width="400"
              />
              {original_title ? original_title : name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

MoviesList.propTypes = {
  moviesData: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};
