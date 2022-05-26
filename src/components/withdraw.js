import React from "react";
import Card from "./card";

function Withdraw({ user, balance, updateBalance }) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [amount, setamount] = React.useState(0);

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
    if (!user.uid) {
      setStatus("Error: You have to log in");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleWithdraw() {
    if (!validate(amount, "amount")) return;
    updateBalance(Number(-amount));
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
        header="Withdraw"
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
                onClick={handleWithdraw}
                disabled={!amount}
              >
                Withdraw
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
                New withdraw
              </button>
            </>
          )
        }
      />
    </div>
  );
}

export default Withdraw;
