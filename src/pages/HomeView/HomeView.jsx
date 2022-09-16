import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrendMovies } from 'services/getMoviesAPI';
// import styles from './HomeView.module.css';

export const HomeView = props => {
  const [trendMoviesData, setTrendMoviesData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrendMovies().then(data => setTrendMoviesData(data));
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {trendMoviesData && (
        <ul>
          {trendMoviesData.map(movie => (
            <li key={movie.id}>
              <Link
                to={`movies/${JSON.stringify(movie.id)}`}
                state={{ from: location }}
              >
                {movie?.original_title ?? movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
