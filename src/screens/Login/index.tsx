import React, { useState, FormEvent } from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const userData = {
      username,
      password
    };
    setUser(userData);
    setUsername("");
    setPassword("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
        {user && JSON.stringify(user, null, 2)}
      </form>
    </div>
  );
};
