import React, { useEffect, useState } from "react";
import { StarRating } from "./StarRating.jsx";
import { Loader } from "./Loader";

export const MovieDetails = ({
  movieObj,
  onCloseMovie,
  APIKEY,
  onAddWatched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const {
    Actors: actors,
    Director: director,
    Genre: genre,
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Released: released,
    imdbRating,
    Plot: plot,
    imdbID,
  } = movie;

  // console.log(title, year);
  // console.log(movieObj);
  // console.log(movie);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${APIKEY}&i=${movieObj.imdbID}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [movieObj.imdbID]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span> {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating size={24} maxRating={10} display={setUserRating} />
              <button className="btn-add" onClick={handleAdd}>
                add
              </button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </div>
      )}
    </>
  );
};
