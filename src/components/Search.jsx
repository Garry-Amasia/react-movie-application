import React, { useEffect, useRef, useState } from "react";

export const Search = ({ query, setQuery }) => {
  //NOT IDEAL!!!!!!REACT IS DECLARATIVE NOT IMPERATIVE
  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   console.log(el);
  //   el.focus();
  // }, []);

  const inputEl = useRef(null);

  //we use useEffect because input need to be loaded to the DOM first
  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
      // console.log("runs");
    };

    document.addEventListener("keydown", callback);

    //????? with or without this will still work
    return () => {
      console.log("hahaha");
      document.addEventListener("keydown", callback);
    };
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};
