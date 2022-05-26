import React from "react";
import Card from "./card";

function Transfer({ user, users, balance, transferBalance }) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [account, setAccount] = React.useState(0);
  const [amount, setamount] = React.useState(0);
  const [recipient, setRecipient] = React.useState({ name: "" });

  function updateAccount(value) {
    setAccount(value);
    setRecipient(
      users.find((user) => user.accountNumber === Number(value)) || { name: "" }
    );
  }

  function validate(field, label) {
    if (field <= 0) {
      setStatus("Error: " + label + " must be positive");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (field > balance) {
      setStatus("Error: " + label + " must be lower than actual balance");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (!recipient.name) {
      setStatus("Error: Account number does not exist");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (user.uid === recipient.uid) {
      setStatus("Error: Can't transfer yourselve");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (!user.uid) {
      setStatus("Error: You have to log in");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleTransfer() {
    if (!validate(amount, "amount")) return;
    transferBalance(Number(amount), recipient.uid);
    setShow(false);
  }

  function clearForm() {
    setamount(0);
    setShow(true);
  }

  return (
    <div className="px-3 py-3">
      <Card
        bgcolor="primary"
        header="Transfer"
        subtitle={"Actual balance: $" + balance}
        status={status}
        body={
          show ? (
            <>
              Account number
              <br />
              <input
                type="number"
                className="form-control"
                id="account"
                placeholder="Enter account"
                value={account}
                onChange={(e) => updateAccount(e.currentTarget.value)}
              />
              Amount
              <br />
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setamount(e.currentTarget.value)}
              />
              Recipient user
              <br />
              <input
                type="text"
                className="form-control"
                id="recipient"
                value={recipient.name}
                disabled
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleTransfer}
                disabled={!amount}
              >
                Transfer
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
                New Transfer
              </button>
            </>
          )
        }
      />
    </div>
  );
}

export default Transfer;
