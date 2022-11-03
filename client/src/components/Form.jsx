import { useState } from "react";
import APIService from "./APIService";

const Form = (props) => {
  const [bill, setBill] = useState("");
  const [amount, setAmount] = useState("");

  function insertBill() {
    APIService.InsertBill(props.type, { bill, amount })
      .then(props.insertedBill(props.type, { bill, amount }))
      .catch((error) => console.log("error", error));
  }

  function handleSubmit(event) {
    event.preventDefault();
    insertBill();
    setBill("");
    setAmount("");
  }
  return (
    <div className="shadow p-4 form-box">
      <form>
        <label htmlFor={props.type} className="form-label">
          {props.type}
        </label>
        <input
          type="text"
          className="form-control"
          placeholder={`Enter ${props.type} item`}
          name={props.type}
          value={bill}
          onChange={(n) => setBill(n.target.value)}
          required
        />

        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button className="btn btn-primary mt-2" onClick={handleSubmit}>
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Form;
