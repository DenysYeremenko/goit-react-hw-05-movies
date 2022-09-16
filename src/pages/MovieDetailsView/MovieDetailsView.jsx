import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieById } from 'services/getMoviesAPI';
// import styles from './MovieDetailsView.module.css';

export const MovieDetailsView = props => {
  const [movieData, setMovieData] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location?.state?.from ?? '/';

  useEffect(() => {
    getMovieById(movieId).then(data => {
      const { original_title, overview, poster_path, genres } = data;
      setMovieData({
        original_title,
        overview,
        poster_path,
        genres: genres.map(g => g.name),
      });
    });
  }, [movieId]);

  return (
    movieData && (
      <div>
        <Link to={backLink}>Go back</Link>
        <img
          src={`https://image.tmdb.org/t/p/w200${movieData.poster_path}`}
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
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    )
  );
};
