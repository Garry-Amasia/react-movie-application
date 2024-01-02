import React from "react";
import { Puff } from "react-loading-icons";

export const Loader = () => {
  return (
    <p className="loader">
      <Puff speed={1} />
    </p>
  );
};
