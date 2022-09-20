import { Spinner } from 'components/Spinner/Spinner';
import { Suspense, useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieById } from 'services/getMoviesAPI';
import styles from './MovieDetailsView.module.css';

const MovieDetailsView = props => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location?.state?.from ?? '/';

  useEffect(() => {
    setIsLoading(true);
    getMovieById(movieId).then(data => {
      const { original_title, overview, poster_path, genres } = data;
      setMovieData({
        original_title,
        overview,
        poster_path,
        genres: genres.map(g => g.name),
      });
      setIsLoading(false);
    });
  }, [movieId]);

  return (
    <div>
      {isLoading && <Spinner />}
      {movieData && (
        <div>
          <Link to={backLink} className={styles.link}>
            Go back
          </Link>
          <img
            src={`https://image.tmdb.org/t/p/w400${movieData.poster_path}`}
            alt={movieData.original_title}
          />
          <h2>{movieData.original_title}</h2>
          <p>User Score: </p>
          <h3>Overview</h3>
          <p>{movieData.overview}</p>
          <h3>Genres</h3>

          <p>{movieData.genres.join(' ')}</p>
          <ul>
            <span>Additional infromation</span>
            <li>
              <NavLink
                to="cast"
                className={styles.link}
                state={{ from: backLink }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to="reviews"
                className={styles.link}
                state={{ from: backLink }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsView;
