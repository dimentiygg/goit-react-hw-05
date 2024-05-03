import { useEffect, useState } from "react";
import { getMovieByName } from "../../MovieApi";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import css from "./MoviesPage.module.css";
import MoviesList from "../../components/MoviesList/MoviesList";
import Loader from "../../components/Loader/Loader";

export default function MoviesPage() {
  const [movieResults, setMovieResults] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const seacrhQuery = searchParams.get("movieName") ?? "";

  useEffect(() => {
    async function fetchMovieByName() {
      try {
        if (seacrhQuery !== "") {
          setLoader(true);
          const data = await getMovieByName(seacrhQuery);
          setMovieResults(data.results);
          if (data.results.length === 0) {
            setError(true);
          } else {
            setError(false);
          }
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    fetchMovieByName();
  }, [seacrhQuery]);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.elements.input.value == "") {
      toast.error("Enter a text");
    }

    setSearchParams({
      movieName: form.elements.input.value,
    });

    form.reset();
  };

  return (
    <div>
      <form onSubmit={submitHandler} className={css.form}>
        <input type="text" name="input" />
        <button type="submit">Search</button>
      </form>

      {loader && <Loader />}
      {movieResults.length > 0 && <MoviesList movies={movieResults} />}

      {error && (
        <p className={css.error}>
          Sorry, there are no movies matching the request
        </p>
      )}

      <Toaster />
    </div>
  );
}
