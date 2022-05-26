import React from "react";
import Card from "./card";

function AllData({ user, users }) {
  return (
    <div className="px-3 py-3">
      <Card
        bgcolor="primary"
        header="All Data Stored"
        title="Current User"
        body={user.email}
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Account Number</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.accountNumber}</td>
              <td>${user.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllData;
