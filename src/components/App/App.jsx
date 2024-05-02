import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomePage from "../../pages/HomePage/HomePage";
import Layout from "../Layout/Layout";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
