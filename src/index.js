import React from "react";
import { render } from "react-dom";
import Tabular from "./Tabular";

const rootElement = document.querySelector("#root");
if (rootElement) {
  render(<Tabular />, rootElement);
}
