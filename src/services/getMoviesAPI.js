import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org';
const API_KEY = '4cbf950c3581503d12678aef92b159f7';

export const getTrendMovies = async () => {
  try {
    const response = await axios.get(`3/trending/movie/day?api_key=${API_KEY}`);
    return response.data.results;
  } catch (err) {
    console.log(err);
  }
};

export const getMovieById = async (movieId, credits, reviews) => {
  try {
    const response = await axios.get(
      `3/movie/${movieId}${credits ? '/credits' : ''}${
        reviews ? '/reviews' : ''
      }?api_key=${API_KEY}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSearchingMovies = async query => {
  try {
    const response = await axios.get(
      `3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    return response.data.results;
  } catch (err) {
    console.log(err);
  }
};
