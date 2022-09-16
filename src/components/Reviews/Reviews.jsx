import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from 'services/getMoviesAPI';
// import styles from './Reviews.module.css';

export const Reviews = props => {
  const { movieId } = useParams();
  const [reviewsData, setReviewsData] = useState(null);

  useEffect(() => {
    getMovieById(movieId, false, true).then(data => {
      // const { name, profile_path, character } = data.cast;
      setReviewsData(data.results);
    });
  }, [movieId]);

  return (
    <div>
      {reviewsData && (
        <ul>
          {reviewsData.map(rev => {
            return (
              <li key={rev.author}>
                <h5>{rev.author}</h5>
                <p>{rev.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
