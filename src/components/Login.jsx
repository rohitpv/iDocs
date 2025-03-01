import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";
function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  let alert = useContext(AlertContext);
  let { showAlert } = alert;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://idocs.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // Save auth-token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("You have successfully Logged In", "success");
    } else {
      window.alert("There was an error Logging In, please try again", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-5" style={{ width: "500px" }}>
      <h3>Log in </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
