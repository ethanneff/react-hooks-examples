import React from "react";
import ReactDOM from "react-dom";
import "./normalize.css";
import "./index.css";
import { Sample } from "./screens";
import * as serviceWorker from "./serviceWorker";
ReactDOM.render(<Sample />, document.getElementById("root"));
serviceWorker.register();
