import React, { useState } from "react";
import { Search } from "./Search";
import { Logo } from "./Logo";
import { NumResult } from "./NumResult";

export const NavBar = ({ children }) => {
  return <nav className="nav-bar">{children}</nav>;
};
