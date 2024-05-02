import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../MovieApi";
import Loader from "../Loader/Loader";
import css from "./Reviews.module.css";

export default function Reviews() {
  const { movieId } = useParams();
  const [MovieReviews, setMovieReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setLoader(true);
        const data = await getMovieReviews(movieId);
        setMovieReviews(data);
        data.results.length === 0 && setError(true);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      {loader && <Loader />}
      {MovieReviews.results && (
        <ul>
          {MovieReviews.results.map((review) => {
            return (
              <li key={review.id}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
      {error && (
        <p className={css.error}>We dont have any reviews for this movie</p>
      )}
    </div>
  );
}
