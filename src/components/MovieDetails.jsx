import React, { useEffect, useState } from "react";
import { StarRating } from "./StarRating.jsx";
import { Loader } from "./Loader";

export const MovieDetails = ({
  movieObj,
  onCloseMovie,
  APIKEY,
  onAddWatched,
  watched,
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

  useEffect(() => {
    if (!title) return;
    document.title = `${title}`;

    return () => {
      document.title = `Movie App`;
      console.log("clean up function runs");
      console.log(`clean up for movie ${title}`);
    };
  }, [title]);

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

  // console.log("movie details component runs");

  const setOfIDs = watched.map((singleMov) => singleMov.imdbID);
  const isIncluded = setOfIDs.includes(movieObj.imdbID);

  const ratingGivenByUser = watched.find(
    (item) => item.imdbID === movieObj.imdbID
  )?.userRating;
  // console.log(isIncluded);
  // console.log(watched);

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
              {!isIncluded ? (
                <>
                  <StarRating
                    size={24}
                    maxRating={10}
                    display={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      add
                    </button>
                  )}
                </>
              ) : (
                <p>You have rated this movie {ratingGivenByUser}</p>
              )}
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
