import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/";
const authorizationApi =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWZmMmE1ZTI0OTE4YjdjMjFkMjVmNTI5ZWJjODU0YiIsInN1YiI6IjY2MzNhN2M5YzM5MjY2MDEyOTZkOWY5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EbJbJqcnJV0frrsd4o-4TQvvbMnCAcHFg_X6DPTBCFU";
const params = {
  headers: {
    Authorization: `Bearer ${authorizationApi}`,
    accept: "application/json",
  },
};

export async function getTrendingMovies() {
  const response = await axios.get(
    "3/trending/movie/day?language=en-US",
    params
  );

  return response.data.results;
}

export async function getMovieDetail(movieId) {
  const response = await axios.get(`3/movie/${movieId}?language=en-US`, params);

  return response.data;
}

export async function getMovieCast(movieId) {
  const response = await axios.get(
    `3/movie/${movieId}/credits?language=en-US`,
    params
  );

  return response.data;
}

export async function getMovieReviews(movieId) {
  const response = await axios.get(
    `3/movie/${movieId}/reviews?language=en-US`,
    params
  );

  return response.data;
}

export async function getMovieByName(movieName) {
  const response = await axios.get(
    `3/search/movie?&language=en-US&query=${movieName}`,
    params
  );

  return response.data;
}
