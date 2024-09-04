import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { API_URL } from "../constant";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (event) => {
    event.preventDefault();
    try {
      axios
        .post(`${API_URL}/auth/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          setIsLoggedIn(true);
          setUserData(res.data);
          navigate("/home");
        })
        .catch((err) => {
          alert(err?.response?.data?.message);
        });
    } catch (error) {}
  };
  return (
    <div className="login templete d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="border p-5 rounded bg-white">
        <form onSubmit={onLogin}>
          <h3 className="text-center">Login</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <p>
              Don't have an account? <Link to={"/signup"}>signup </Link>
            </p>
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
