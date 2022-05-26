import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import Login from "./components/login";
import CreateAccount from "./components/createaccount";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import AllData from "./components/alldata";
import { auth, db } from "./firebase";

function App() {
  const [user, setUser] = React.useState({});
  const [balance, setBalance] = React.useState(0);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
  }, []);

  React.useEffect(
    () =>
      db.collection("users").onSnapshot(async (snap) => {
        setUsers(await Promise.all(snap.docs.map((doc) => doc.data())));
      }),
    []
  );

  React.useEffect(() => {
    var unsubscribe = () => {};
    if (user.uid) {
      unsubscribe = db.doc(`users/${user.uid}`).onSnapshot(async (snap) => {
        setBalance((await snap.data()).balance);
      });
    } else {
      setBalance(0);
      unsubscribe = () => {};
    }
    return unsubscribe;
  }, [user]);

  function updateBalance(amount) {
    if (user.uid) {
      db.doc(`users/${user.uid}`).update({ balance: balance + amount });
    }
  }

  return (
    <div>
      <NavBar email={user.email} balance={balance} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login email={user.email} />} />
        <Route
          path="deposit"
          element={
            <Deposit
              user={user}
              balance={balance}
              updateBalance={updateBalance}
            />
          }
        />
        <Route
          path="withdraw"
          element={
            <Withdraw
              user={user}
              balance={balance}
              updateBalance={updateBalance}
            />
          }
        />
        <Route
          path="all-data"
          element={<AllData user={user} users={users} />}
        />
        <Route
          path="create-account"
          element={<CreateAccount users={users} />}
        />
      </Routes>
    </div>
  );
}

export default App;
