import React, { useState } from "react";
import { Star } from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

export const StarRating = ({
  maxRating = 5,
  messages = [],
  color = "yellow",
  size = 48,
  defaultRating = 0,
  display,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
    if (display) {
      display(rating);
    } else {
      return;
    }
  };

  const handleMouseIn = (rating) => {
    setTempRating(rating);
  };

  const handleMouseOut = (rating) => {
    setTempRating(0);
  };

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, index) => {
          return (
            <Star
              key={index}
              isFull={
                tempRating ? tempRating >= index + 1 : rating >= index + 1
              }
              onRate={() => handleRating(index + 1)}
              onMouseIn={() => handleMouseIn(index + 1)}
              onMouseOut={() => handleMouseOut(0)}
              color={color}
              size={size}
            />
          );
        })}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};
