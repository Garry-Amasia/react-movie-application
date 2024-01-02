import React, { useState } from "react";
import { StarRating } from "./StarRating";

export const Test = () => {
  const [ratedMovie, setRatedMovie] = useState(0);

  const display = (rating) => {
    setRatedMovie(rating);
  };
  return (
    <div>
      <StarRating color="black" maxRating={10} display={display} />
      <p>This movie was rated {ratedMovie} star</p>
    </div>
  );
};
