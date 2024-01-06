import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { Main } from "./components/Main";
import { Search } from "./components/Search";
import { NumResult } from "./components/NumResult";
import { Logo } from "./components/Logo";
import { Box } from "./components/Box";
import { MovieList } from "./components/MovieList";
import { WatchedSummary } from "./components/WatchedSummary";
import { WatchedMovieList } from "./components/WatchedMovieList";
import { Loader } from "./components/Loader";
import { Error } from "./components/Error";
import { MovieDetails } from "./components/MovieDetails";

const APIKEY = "2016dc0e";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("inception");

  const [selectedMovieObj, setSelectedMovieObj] = useState(null);

  const handleSelectMovie = (movieObj) => {
    setSelectedMovieObj((current) =>
      current?.imdbID === movieObj?.imdbID ? null : movieObj
    );
  };

  const handleAddWatched = (movieObj) => {
    setWatched((current) => [...current, movieObj]);
  };
  console.log(watched);

  const handleCloseMovie = () => {
    setSelectedMovieObj(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      try {
        setIsLoading(true);
        // setError(""); //=> because query state is empty string and will return incorrect IMDb ID
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`
        );
        // if (!response.ok) {
        //   throw new Error("Something wrong with your internet connection");
        // }
        const data = await response.json();
        if (data.Response === "False") {
          setError(data.Error);
          return;
        }
        setMovies(data.Search);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <Error message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedMovieObj ? (
            <MovieDetails
              movieObj={selectedMovieObj}
              onCloseMovie={handleCloseMovie}
              APIKEY={APIKEY}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
