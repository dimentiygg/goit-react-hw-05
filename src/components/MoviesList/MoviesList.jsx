import css from "./MoviesList.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MoviesList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.moviesList}>
      {movies.map((movie) => {
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
