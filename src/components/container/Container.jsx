import React from "react";
import { Children } from "react";

function Container({ children }) {
  return <div className="w-full max-w-7xl mx-auto px-4">{Children}</div>;
}

export default Container;
