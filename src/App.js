import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import Login from "./components/login";
import CreateAccount from "./components/createaccount";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import Transfer from "./components/transfer";
import AllData from "./components/alldata";
import { auth, db, FieldValue } from "./firebase";

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
        const usersdata = [];
        await Promise.all(
          snap.docs.map(async (doc) => {
            const userdata = await doc.data();
            userdata.uid = doc.id;
            usersdata.push(userdata);
          })
        );
        setUsers(usersdata);
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
      db.doc(`users/${user.uid}`).update({
        balance: FieldValue.increment(amount),
      });
    }
  }

  function transferBalance(amount, destuid) {
    if (user.uid) {
      db.doc(`users/${user.uid}`).update({
        balance: FieldValue.increment(-amount),
      });
      db.doc(`users/${destuid}`).update({
        balance: FieldValue.increment(amount),
      });
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
          path="transfer"
          element={
            <Transfer
              user={user}
              users={users}
              balance={balance}
              transferBalance={transferBalance}
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
