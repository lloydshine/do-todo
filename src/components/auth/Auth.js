import { useState } from "react";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../../firebase/firebase";
import "./auth.css";

export default function Auth() {
  const [toLogin, setToLogin] = useState(true);

  const handleSwitch = () => {
    setToLogin(!toLogin);
  };

  return (
    <div className="auth">
      <div className="auth-logo">
        <p>
          <span>#1</span> Best Task Manager in Iligan!
        </p>
        <h1>Tasklify</h1>
      </div>
      {toLogin ? (
        <Login handleSwitch={handleSwitch} />
      ) : (
        <Register handleSwitch={handleSwitch} />
      )}
    </div>
  );
}

function Login({ handleSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    loginWithEmailAndPassword(email, password);
  };

  return (
    <div className="form">
      <h2>Login</h2>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="button" onClick={handleLogin} value="Login" />
      <p>
        Don't have an account? <span onClick={handleSwitch}>Register</span>
      </p>
    </div>
  );
}

function Register({ handleSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const handleRegister = () => {
    if (password !== retypePassword) return;
    registerWithEmailAndPassword(email, password);
    handleSwitch(true);
  };

  return (
    <div className="form">
      <h2>Register</h2>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="password">Retype Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={(e) => setRetypePassword(e.target.value)}
      />
      <input type="button" onClick={handleRegister} value="Register" />
      <p>
        Already have an account? <span onClick={handleSwitch}>Login</span>
      </p>
    </div>
  );
}
