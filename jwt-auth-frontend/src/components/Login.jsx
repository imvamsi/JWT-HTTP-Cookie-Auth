import React, { useState } from "react";
import { useLoginUserMutation } from "../slice/apiSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData).unwrap();
      navigate("/");
    } catch (err) {
      alert("Login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
