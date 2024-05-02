import { useEffect, useRef, useState } from "react";
import { getMovieDetail } from "../../MovieApi";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [moviesDetails, setMoviesDetails] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoader(true);
        const data = await getMovieDetail(movieId);
        setMoviesDetails(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  const activeLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.activeLink);
  };

  const location = useLocation();
  const backLink = useRef(location.state ?? "/");

  return (
    <>
      <Link to={backLink.current} className={css.back}>
        Go back
      </Link>
      <div className={css.container}>
        {loader && <Loader />}
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w300/${moviesDetails.poster_path}`}
            alt=""
          />
        </div>
        <div>
          <h1>{moviesDetails.original_title}</h1>
          <p>{`User score: ${Math.round(moviesDetails.vote_average * 10)}%`}</p>

          <h2>Overview</h2>
          <p>{moviesDetails.overview}</p>
          <h2>Genres</h2>
          <p>
            {moviesDetails.genres &&
              moviesDetails.genres.map((el) => el.name).join(" ")}
          </p>
        </div>
      </div>

      <p>Additional information</p>

      <ul className={css.list}>
        <li>
          <NavLink to="cast" className={activeLink}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={activeLink}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
