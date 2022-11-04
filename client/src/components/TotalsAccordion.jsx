import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "./Form";

export default function TotalsAccordion(props) {
  var customStyle = {
    color: "",
  };
  var messege = "";

  props.total >= 0
    ? (customStyle.color = "green" )
    : (customStyle.color = "red");

  props.total >= 0
  ? (messege="Total Excess")
  : (messege="Total Deficit")

  

  return (
    // Add defaultActiveKey="0" here to make them open on load
    <Accordion className="item-box totals-accordion" defaultActiveKey="0">
      <Accordion.Item eventKey="0" className="">
        <Accordion.Header className="" onClick={props.onClick}>
        {props.type}{props.showForm ? <span className="button-label ms-auto">👉 Click here to expand 👈</span> : null}
        </Accordion.Header>
        <Accordion.Body>
          <Table>
            <thead>
              <tr>
                <th>{props.type} Item</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              {Object.keys(props.obj).map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item}</td>
                    <td>$ {props.obj[item]}</td>
                  </tr>
                );
              })}
              <tr style={customStyle} className="total-balance">
                <td>{messege}:</td>
                <td>$ {props.total}</td>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
