import React from "react";
import Card from "./card";

function Deposit({ user, balance, updateBalance }) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [amount, setamount] = React.useState(0);

  function validate(field, label) {
    if (field <= 0) {
      setStatus("Error: " + label + " must be positive");
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

  function handleDeposit() {
    if (!validate(amount, "amount")) return;
    updateBalance(Number(amount));
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
        header="Deposit"
        subtitle={"Actual balance: $" + balance}
        status={status}
        body={
          show ? (
            <>
              amount
              <br />
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setamount(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleDeposit}
                disabled={!amount}
              >
                Deposit
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
                New deposit
              </button>
            </>
          )
        }
      />
    </div>
  );
}

export default Deposit;
