import React from "react";
import { useSelector } from "react-redux";
import { getAllMovies, getAllShows } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  // Set loading states for movies and shows
  const moviesLoading = useSelector((state) => state.movies.loading);
  const showsLoading = useSelector((state) => state.movies.loading);

  let renderMovies = "";
  let renderShows = "";

  if (movies.Response === "True") {
    renderMovies = movies.Search.map((movie, index) => (
      <MovieCard key={index} data={movie} />
    ));
  } else {
    renderMovies = (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );
  }

  if (shows.Response === "True") {
    renderShows = shows.Search.map((show, index) => (
      <MovieCard key={index} data={show} />
    ));
  } else {
    renderShows = (
      <div className="shows-error">
        <h3>{shows.Error}</h3>
      </div>
    );
  }

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>

        {moviesLoading ? (
          <div className="loading">
            <i className="fas fa-spinner"></i> Loading...
          </div>
        ) : (
          <div className="movie-container">{renderMovies}</div>
        )}
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        {showsLoading ? (
          <div className="loading">
            <i className="fas fa-spinner"></i> Loading...
          </div>
        ) : (
          <div className="movie-container">{renderShows}</div>
        )}
      </div>
    </div>
  );
};

export default MovieListing;
