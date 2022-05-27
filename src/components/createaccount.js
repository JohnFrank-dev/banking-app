import React from "react";
import Card from "./card";
import { auth, GoogleAuthProvider, db } from "../firebase";

function CreateAccount({ users }) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function validate(field, label, minLength) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (minLength && field.length < minLength) {
      setStatus(
        "Error: " + label + "must be at least " + minLength + " characters"
      );
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function generateAccountNumber() {
    var number;
    do {
      number = Math.round(10 ** 10 * Math.random());
    } while (users.find((user) => user.account === number));
    return number;
  }

  function handleCreate() {
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password", 8)) return;
    const accountNumber = generateAccountNumber();
    auth.createUserWithEmailAndPassword(email, password).then(({ user }) =>
      db.doc(`users/${user.uid}`).set({
        balance: 0,
        name,
        email,
        password,
        accountNumber,
      })
    );
    setShow(false);
  }

  function loginGoogle() {
    setLoading(true);
    const accountNumber = generateAccountNumber();
    auth
      .signInWithPopup(new GoogleAuthProvider())
      .then(({ user }) => {
        db.doc(`users/${user.uid}`).set({
          balance: 0,
          name: user.displayName,
          email: user.email,
          password,
          accountNumber,
        });
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

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <div className="px-3 py-3">
      <Card
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={
          show ? (
            <>
              Name
              <br />
              <input
                type="input"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <br />
              Email address
              <br />
              <input
                type="input"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <br />
              Password
              <br />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleCreate}
                disabled={!name || !email || !password || loading}
              >
                Create Account
              </button>
              <br />
              <button
                type="submit"
                className="btn btn-light mt-2"
                disabled={loading}
                onClick={loginGoogle}
              >
                Sign up with Google
              </button>
            </>
          ) : (
            <>
              <h5>Success</h5>
              <button
                type="submit"
                className="btn btn-light"
                onClick={clearForm}
              >
                Add another account
              </button>
            </>
          )
        }
      />
    </div>
  );
}

export default CreateAccount;
