import { MoviesList } from 'components/MoviesList/MoviesList';
import { Spinner } from 'components/Spinner/Spinner';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTrendMovies } from 'services/getMoviesAPI';

export const HomeView = props => {
  const [trendMoviesData, setTrendMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getTrendMovies().then(data => {
      setTrendMoviesData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {isLoading && <Spinner />}
      {trendMoviesData && (
        <MoviesList moviesData={trendMoviesData} location={location} />
      )}
    </div>
  );
};
