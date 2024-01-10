import React, { useEffect, useState } from "react";

const APIKEY = "2016dc0e";

export const useMovies = (query, callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

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
          `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
          { signal: controller.signal }
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
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // handleCloseMovie();
    callback?.();

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, error, isLoading };
};
