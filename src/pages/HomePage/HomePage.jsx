import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../MovieApi";
import Loader from "../../components/Loader/Loader";
import MoviesList from "../../components/MoviesList/MoviesList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [TrendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setLoader(true);
        const data = await getTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      {TrendingMovies.length > 0 && <MoviesList movies={TrendingMovies} />}
      {loader && <Loader />}
    </>
  );
}
