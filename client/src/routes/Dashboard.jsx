import React from "react";
import Form from "../components/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemAccordion from "../components/ItemAccordion";
import Spinner from "react-bootstrap/Spinner";
import TotalsAccordion from "../components/TotalsAccordion";
import Footer from "../components/Footer";
import Navibar from "../components/Navibar";


export default function Dashboard() {
  const [billsData, setBillsData] = React.useState();
  const [savingsData, setSavingsData] = React.useState();
  const [incomeData, setIncomeData] = React.useState();
  const [showForm, setShowForm] = React.useState(false);

  var saveSum;
  var incomeSum;
  var billSum;
  var totalAmount;

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  React.useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await fetch(`/dashboard`);
      // convert the data to json
      const json = await data.json();
      // set state with the result
      setBillsData(json[0]["Bills"]);
      setSavingsData(json[0]["Savings"]);
      setIncomeData(json[0]["Income"]);
    };
    fetchData().catch(console.error);
  }, []);

  function insertBill(type, billJson) {
    const { bill, amount } = billJson;
    if (type === "Bills") {
      const new_items = { ...billsData, [bill]: amount };
      setBillsData(new_items);
    } else if (type === "Savings") {
      const new_items = { ...savingsData, [bill]: amount };
      setSavingsData(new_items);
    } else if (type === "Income") {
      const new_items = { ...incomeData, [bill]: amount };
      setIncomeData(new_items);
    }
  }

  function sum(obj) {
    if (obj) {
      return Object.keys(obj).reduce(
        (sum, key) => sum + parseFloat(obj[key] || 0),
        0
      );
    }
  }

  savingsData ? (saveSum = sum(savingsData)) : (saveSum = 0);
  billsData ? (billSum = sum(billsData)) : (billSum = 0);
  incomeData ? (incomeSum = sum(incomeData)) : (incomeSum = 0);
  totalAmount = incomeSum - saveSum - billSum;

  return (
    <div>
    <Navibar />
    <Container>
      <h1>
        Montly Bill Calculator
        <span>
          <form action="http://127.0.0.1:5000/delete">
            <button className="btn btn-primary">
              DEVELOPMENT - Delete All
            </button>
          </form>
        </span>
      </h1>
      <Row>
      <Col md={12} lg={6}>
          <h2>Bills</h2>
          {billsData ? (
            <ItemAccordion
              onClick={toggleShowForm}
              obj={billsData}
              type={"Bills"}
            />
          ) : (
            <Spinner animation="border" />
          )}
          <div className="d-flex justify-content-end totals">
            <p>Bills Total: {billSum}</p>
          </div>

          {/* {showForm && (<Form type={"Bills"} insertedBill={insertBill} /> )} */}
          <Form type={"Bills"} insertedBill={insertBill} />
        </Col>
        <Col md={12} lg={6}>
          <h2>Savings</h2>
          {savingsData ? (
            <ItemAccordion obj={savingsData} type={"Savings"} />
          ) : (
            <Spinner animation="border" />
          )}
          <div className="d-flex justify-content-end totals">
            <p className="">Savings Total: {saveSum}</p>
          </div>
          <Form type={"Savings"} insertedBill={insertBill} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Income</h2>
          {incomeData ? (
            <ItemAccordion obj={incomeData} type={"Income"} />
          ) : (
            <Spinner animation="border" />
          )}
          <div className="d-flex justify-content-end totals">
            <p>Income Total: {incomeSum}</p>
          </div>
          <Form type={"Income"} insertedBill={insertBill} />
        </Col>
      </Row>
      <h2>Totals</h2>
      <TotalsAccordion
        total={totalAmount}
        obj={{
          "Total Bills": billSum,
          "Total Savings": saveSum,
          "Total Bills & Savings": saveSum + billSum,
        }}
        type={"Totals"}
      />
      <Footer />
    </Container>
    </div>
  );
}
