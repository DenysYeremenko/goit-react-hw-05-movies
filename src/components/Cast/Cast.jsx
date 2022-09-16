import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from 'services/getMoviesAPI';
import styles from './Cast.module.css';

export const Cast = props => {
  const { movieId } = useParams();
  const [castData, setCastData] = useState(null);

  useEffect(() => {
    getMovieById(movieId, true).then(data => {
      // const { name, profile_path, character } = data.cast;
      setCastData(data.cast);
    });
  }, [movieId]);

  return (
    <div>
      {castData && (
        <ul className={styles.castList}>
          {castData.map(actor => {
            const { name, profile_path, character } = actor;
            return (
              <li key={name}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w200${profile_path}`
                      : 'https://i.pinimg.com/originals/7c/1c/a4/7c1ca448be31c489fb66214ea3ae6deb.jpg'
                  }
                  alt={name}
                  width="200"
                />
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
