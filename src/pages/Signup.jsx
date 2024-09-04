import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = () => {};
  return (
    <div className="login templete d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="border p-5 rounded bg-white">
        <form onSubmit={onSignup}>
          <h3 className="text-center">Sign Up</h3>

          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              Already have an account? <Link to={"/"}>Login </Link>
            </p>
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-100">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
