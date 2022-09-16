// import styles from './MoviesView.module.css';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { getSearchingMovies } from 'services/getMoviesAPI';
import { useEffect } from 'react';

export const MoviesView = props => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState(null);
  const query = searchParams.get('query');
  const location = useLocation();

  useEffect(() => {
    query &&
      getSearchingMovies(query).then(data => {
        setSearchResults(data);
      });
  }, [query]);

  const submitHandler = e => {
    e.preventDefault();
    const query = e.target[0].value;

    setSearchParams({ query });
  };

  return (
    <div>
      <form onSubmit={e => submitHandler(e)}>
        <input type="text" />
        <button type="submit">submit</button>
      </form>
      {searchResults && (
        <ul>
          {searchResults.map(({ original_title, name, id }) => {
            return (
              <li key={id}>
                <Link to={JSON.stringify(id)} state={{ from: location }}>
                  {original_title ? original_title : name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
