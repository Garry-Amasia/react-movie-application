import React from "react";

export const SelectedMovie = ({ movieObj, onCloseMovie }) => {
  return (
    <div className="detail">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      {movieObj.imdbID}
    </div>
  );
};
