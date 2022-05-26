import { Link } from "react-router-dom";
import React from "react";
function NavBar({ email }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Bank App</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Main view"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/deposit"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Increase your balance"
                >
                  Deposit
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/withdraw"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Get your money"
                >
                  Withdraw
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/all-data"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Displays all internal data"
                >
                  All Data
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/create-account"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Register new account"
                >
                  Create Account
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Access to your account"
                >
                  Login
                </Link>
              </li>
            </ul>
            <Link
              className="nav-link"
              to="/login"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Access to your account"
            >
              <span>{email}</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
