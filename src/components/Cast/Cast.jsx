import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../MovieApi";
import css from "./cast.module.css";
import Loader from "../Loader/Loader";

export default function Cast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setLoader(true);
        const data = await getMovieCast(movieId);
        setMovieCast(data);
        data.cast.length === 0 && setError(true);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      {loader && <Loader />}
      {movieCast.cast && (
        <ul className={css.list}>
          {movieCast.cast.map((actor) => {
            return (
              <li key={actor.cast_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
                  alt=""
                />
                <p>{actor.name}</p>
              </li>
            );
          })}
        </ul>
      )}

      {error && <p className={css.error}>Sory, we dont have info about cast</p>}
    </div>
  );
}
