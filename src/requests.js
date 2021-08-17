// const API_KEY = "4ec4b0d1e8dc8fc71ee4f5122df3e6c8";
const { REACT_APP_TOKEN } = process.env;

const requests = {
  fetchTrending: `/trending/all/week?api_key=${REACT_APP_TOKEN}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${REACT_APP_TOKEN}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${REACT_APP_TOKEN}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${REACT_APP_TOKEN}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${REACT_APP_TOKEN}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${REACT_APP_TOKEN}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${REACT_APP_TOKEN}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${REACT_APP_TOKEN}&with_genres=99`,
};

export default requests;
