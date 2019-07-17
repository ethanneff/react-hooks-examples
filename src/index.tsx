import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Todos, Login, Register, News, Sample } from "./screens";
import * as serviceWorker from "./serviceWorker";

const App = () => {
  return (
    <>
      <h1>Sample</h1>
      <Sample />
      <hr />
      <h1>Login</h1>
      <Login />
      <hr />
      <h1>Register</h1>
      <Register />

      <hr />
      <h1>News</h1>
      <News />
      <hr />
      <h1>Todos</h1>
      <Todos />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.register();

//@ts-ignore
if (module.hot) {
  //@ts-ignore
  module.hot.accept();
}
