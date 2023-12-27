import React, { useState } from "react";
import { ListBox } from "./ListBox";
import { WatchedBox } from "./WatchedBox";

export const Main = ({ movies, watched }) => {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox watched={watched} />
    </main>
  );
};
