import { useLocation, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { getSearchingMovies } from 'services/getMoviesAPI';
import { useEffect } from 'react';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { Spinner } from 'components/Spinner/Spinner';

const MoviesView = props => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const query = searchParams.get('query');
  const location = useLocation();

  useEffect(() => {
    query && setIsLoading(true);
    query &&
      getSearchingMovies(query).then(data => {
        if (data.length > 0) {
          setSearchResults(data);
          setIsLoading(false);
        } else {
          alert('Sorry, movies not found');
          setIsLoading(false);
        }
      });
  }, [query]);

  const submitHandler = e => {
    e.preventDefault();
    if (e.target[0].value === '') {
      alert('Please write the name of the movie');
      return;
    }

    const query = e.target[0].value;
    setSearchParams({ query });
  };

  return (
    <div>
      <form onSubmit={e => submitHandler(e)}>
        <input type="text" />
        <button type="submit">submit</button>
      </form>
      {isLoading && <Spinner />}
      {query && searchResults.length > 0 && (
        <MoviesList moviesData={searchResults} location={location} />
      )}
    </div>
  );
};

export default MoviesView;
