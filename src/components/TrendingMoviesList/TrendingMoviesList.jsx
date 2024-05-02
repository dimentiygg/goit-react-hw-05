import { Link, useLocation } from "react-router-dom";
import css from "./TrendingMoviesList.module.css";

export default function TrendingMoviesList({ trendingMovies }) {
  const location = useLocation();

  return (
    <ul className={css.moviesList}>
      {trendingMovies.map((movie) => {
        return (
          <li key={movie.id} className={css.listItem}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
