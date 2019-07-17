import React, { useState, FormEvent } from "react";

const initialForm = { username: "", email: "", password: "" };
export const Register = () => {
  const [form, setForm] = useState(initialForm);
  const [user, setUser] = useState();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUser(form);
    setForm(initialForm);
  };

  const handleFormChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Register</h2>
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
          placeholder="email"
          name="email"
          onChange={handleFormChange}
          value={form.email}
        />
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleFormChange}
          value={form.username}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleFormChange}
        />
        <button type="submit">Submit</button>
        {user && JSON.stringify(user, null, 2)}
      </form>
    </div>
  );
};
