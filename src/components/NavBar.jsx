import React, { useState } from "react";
import { Search } from "./Search";
import { Logo } from "./Logo";
import { NumResult } from "./NumResult";

export const NavBar = ({ movies }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResult movies={movies} />
    </nav>
  );
};
