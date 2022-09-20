import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from 'services/getMoviesAPI';

const Reviews = props => {
  const { movieId } = useParams();
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    getMovieById(movieId, false, true).then(data => {
      setReviewsData(data.results);
    });
  }, [movieId]);

  return (
    <div>
      {reviewsData.length > 0 ? (
        <ul>
          {reviewsData.map(rev => {
            return (
              <li key={rev.id}>
                <h5>{rev.author}</h5>
                <p>{rev.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3>Sorry, reviews not found</h3>
      )}
    </div>
  );
};

export default Reviews;
