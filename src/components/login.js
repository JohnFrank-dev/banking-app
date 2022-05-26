import React from "react";
import Card from "./card";
import { auth } from "../firebase";

function Login({ email }) {
  const [status, setStatus] = React.useState("");
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  //const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleLogin() {
    if (!validate(loginEmail, "email")) return;
    if (!validate(loginPassword, "password")) return;
    setLoading(true);
    auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(() => {
        setLoading(false);
        setStatus("Successfull signed in!");
        setTimeout(() => setStatus(""), 3000);
      })
      .catch((e) => {
        setLoading(false);
        setStatus("Error: " + e.code);
        setTimeout(() => setStatus(""), 3000);
      });
  }

  function signOut() {
    setLoading(true);
    auth
      .signOut()
      .then(() => {
        setLoading(false);
        setLoginEmail("");
        setLoginPassword("");
        setStatus("Successfull signed out!");
        setTimeout(() => setStatus(""), 3000);
      })
      .catch((e) => {
        setLoading(false);
        setStatus("Error: " + e.code);
        setTimeout(() => setStatus(""), 3000);
      });
  }

  return (
    <div className="px-3 py-3">
      <Card
        bgcolor="primary"
        header="Login"
        status={status}
        body={
          !email ? (
            <>
              Email address
              <br />
              <input
                type="input"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.currentTarget.value)}
              />
              <br />
              Password
              <br />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                disabled={!loginEmail || !loginPassword || loading}
                onClick={handleLogin}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <h5>Success</h5>
              <p>You are loged in as {email}</p>
              <button
                type="submit"
                className="btn btn-light"
                disabled={loading}
                onClick={signOut}
              >
                Sign Out
              </button>
            </>
          )
        }
      />
    </div>
  );
}
export default Login;
